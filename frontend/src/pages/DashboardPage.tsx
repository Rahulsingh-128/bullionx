import { PageWrapper } from "../components/layout/PageWrapper";
import { Card } from "../components/ui/Card";
import { PricesDashboard } from "../features/prices/components/PricesDashboard";


export const DashboardPage = () => (
  <PageWrapper>
    <PricesDashboard />
  </PageWrapper>
);
