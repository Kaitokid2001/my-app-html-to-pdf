import ExportHTML from "./component/export-html/page";
import ImportHTML from "./component/import-html/page";
import { Wrapper, HeaderTitle } from "./styles";

export default function Home() {
  return (
    <Wrapper>
      <HeaderTitle>Tool HTML to CSS</HeaderTitle>
      <ImportHTML/>
      <ExportHTML/>
    </Wrapper>
  );
}
