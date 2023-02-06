export default function Footer() {
  return (
    <div
      data-testid="footer"
      className="bg-[#EEEEEE] py-2 text-center font-light text-xs"
    >
      {`${process.env.appName} © Todos os direitos reservados`}
    </div>
  );
}
