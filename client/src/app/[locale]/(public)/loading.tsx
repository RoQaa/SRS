export default function Loading() {
  return (
    <div
      style={{
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: "translate(-50%, -30%)",
      }}
    >
      <img src="/imgs/GFS-Loading.gif" alt="loading-img" />
    </div>
  );
}
