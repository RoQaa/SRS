import Image from "next/image";

export default function NotFound() {
  return (
    <html>
      <body>
        <div
          className="404"
          style={{ position: "relative", width: "90vw", height: "90vh" }}
        >
          <Image
            fill
            style={{ objectFit: "contain" }}
            src={"/imgs/404-error.png"}
            alt="404-Not-Found"
          />
        </div>
      </body>
    </html>
  );
}
