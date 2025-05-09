import style from "./Style.module.css";

export default function Picture({ img, alt, width, height }) {
  return (
    <>
      <h1 className={style.red}>PICTURE COMPONENT</h1>
      <img src={img} alt={alt} width={width} height={height} />
    </>
  );
}
