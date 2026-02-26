interface Props {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function GroupLayout({ children, modal }: Props) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
