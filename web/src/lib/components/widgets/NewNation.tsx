import { Nation, useNations } from "@/lib/hooks";
import { Button } from "../elements/Button";
import { Card } from "../elements/Card";
import { Divider } from "../elements/Divider";
import { Link } from "../elements/Link";
import { Input } from "../form/Input";
import { Grid } from "../layout/Grid";
import { H3 } from "../typography/H3";
import { P } from "../typography/P";

type NewNationProps = {
  onCreate?: (values: Nation) => void;
  initialValues?: Partial<Nation>;
};

export const NewNation = (props: NewNationProps) => {
  const nations = useNations(props);
  return (
    <Card>
      <form onSubmit={nations.handleFormCreate}>
        <Grid gap="1rem">
          <H3>New Nation</H3>
          <Divider />
          <P>public data</P>
          <Input {...nations.form.bind("name")} placeholder="Name" required />
          <Input {...nations.form.bind("code")} placeholder="Short Code" />
          <Input {...nations.form.bind("address")} placeholder="Address" />
          <Input
            {...nations.form.bind("postal_code")}
            placeholder="Postal Code"
          />
          <Input {...nations.form.bind("phone")} placeholder="Phone" />
          <Input {...nations.form.bind("email")} placeholder="Email" />
          <Input {...nations.form.bind("website")} placeholder="Website" />
          <Divider />
          <P>govt registry</P>
          <Input
            {...nations.form.bind("band_number")}
            placeholder="Band Number"
          />
          <Button type="submit">Add</Button>
          <Divider />
          <H3>Sources</H3>
          <Link
            target="_blank"
            to="https://fnp-ppn.aadnc-aandc.gc.ca/fnp/Main/Search/SearchFN.aspx?lang=eng"
          >
            Govt Source
          </Link>
        </Grid>
      </form>
    </Card>
  );
};
