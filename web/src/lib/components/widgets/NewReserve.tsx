import { Reserve, useReserves } from "@/lib/hooks";
import { Card } from "../elements/Card";
import { Divider } from "../elements/Divider";
import { Input } from "../form/Input";
import { Grid } from "../layout/Grid";
import { H3 } from "../typography/H3";
import { P } from "../typography/P";
import { Button } from "../elements/Button";
import { Link } from "../elements/Link";

type NewReserveProps = {
  onCreate?: (values: Reserve) => void;
};

export const NewReserve = ({ onCreate }: NewReserveProps) => {
  const reserves = useReserves({ onCreate });

  return (
    <Card>
      <form onSubmit={reserves.handleFormCreate}>
        <Grid gap="1rem">
          <H3>New Reserve</H3>
          <Divider />
          <P>public data</P>
          <Input {...reserves.form.bind("name")} required />
          <Input {...reserves.form.bind("location")} />
          <Input {...reserves.form.bind("hectares")} />
          <Input {...reserves.form.bind("map_url")} />
          <Divider />
          <P>govt registry</P>
          <Input {...reserves.form.bind("reserve_number")} />
          <Button type="submit">Add</Button>
          <Divider />
          <H3>Sources</H3>
          <Link
            target="_blank"
            to="https://fnp-ppn.aadnc-aandc.gc.ca/FNP/Main/Search/SearchRV.aspx?lang=eng"
          >
            Govt Source
          </Link>
        </Grid>
      </form>
    </Card>
  );
};
