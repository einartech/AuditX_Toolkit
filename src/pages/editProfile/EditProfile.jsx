import { useState } from "react";
import { useUser } from "../../hooks/useUser";
import { UserService } from "../../api/userService";
import Button from "../../components/button/Button";
import styles from "./EditProfile.module.css";

export default function EditProfile() {
  const user = useUser();
  const [form, setForm] = useState({
    username: user?.username || "",
    email: user?.email || "",
    name: user?.name || "",
    surname: user?.surname || "",
    password: "", // Solo se enviará si el usuario lo rellena
    pronouns: user?.pronouns || "",
  });
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    try {
      // Solo envía password si no está vacío
      const dataToSend = { ...form };
      if (!dataToSend.password) {
        delete dataToSend.password;
      }
      await UserService.update(user.id, dataToSend);
      setMsg("Profile updated successfully.");
    } catch {
      setMsg("Error updating profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.editProfileContainer}>
      <h2>Edit Profile</h2>
      <form className={styles.editProfileForm} onSubmit={handleSubmit}>
        <label>
          Username
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Name
          <input name="name" value={form.name} onChange={handleChange} />
        </label>
        <label>
          Surname
          <input name="surname" value={form.surname} onChange={handleChange} />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Leave blank to keep current password"
          />
        </label>
        <label>
          Pronouns
          <input
            name="pronouns"
            value={form.pronouns}
            onChange={handleChange}
            required
          />
        </label>
        <div className={styles.buttonRow}>
          <Button
            type="submit"
            label={saving ? "Saving..." : "Save Changes"}
            disabled={saving}
          />
          <Button
            type="button"
            label="Cancel"
            onClick={() => window.history.back()}
          />
        </div>
        {msg && <div className={styles.msg}>{msg}</div>}
      </form>
    </div>
  );
}
