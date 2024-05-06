interface MultilineProps {
  str: string | undefined;
}

const Multiline = (
  { str }: MultilineProps
) => {
  if (!str) return null;

  const lines = str.split('\n');
  const display = lines.map((str: string, idx: number) => {
    return (<p key={str + idx}>- {str}</p>);
  });

  return (
    <>
      {display}
    </>
  );
};

export default Multiline;


