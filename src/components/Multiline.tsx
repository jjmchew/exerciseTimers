interface MultilineProps {
  str: string | undefined;
  center?: boolean;
}

const Multiline = ({ str, center = false }: MultilineProps) => {
  if (!str) return null;

  let classes = [""];
  if (center) classes.push("centerDetails");

  const lines = str.split("\n");
  const display = lines.map((str: string, idx: number) => {
    return (
      <p className={classes.join(" ")} key={str + idx}>
        - {str}
      </p>
    );
  });

  return <>{display}</>;
};

export default Multiline;
