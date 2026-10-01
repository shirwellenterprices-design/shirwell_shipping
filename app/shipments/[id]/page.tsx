import AppPageHeader from "@/app/components/ui/AppPageHeader";
import AppShell from "@/app/components/ui/AppShell";
import PrimaryButton from "@/app/components/ui/PrimaryButton";
import StatusBadge from "@/app/components/ui/StatusBadge";
import { getShipmentById } from "@/lib/shipments";
import { notFound } from "next/navigation";

type DetailsPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: DetailsPageProps) {
  const { id } = await params;
  const shipment = getShipmentById(id);
  return {
    title: shipment ? `Shipment ${shipment.trackingNumber}` : "Shipment Details",
  };
}

export default async function ShipmentDetailsPage({ params }: DetailsPageProps) {
  const { id } = await params;
  const shipment = getShipmentById(id);

  if (!shipment) notFound();

  const packageRows = [
    { label: "Weight", value: shipment.weight },
    { label: "Dimensions", value: shipment.dimensions },
    { label: "Service Type", value: shipment.serviceType },
    { label: "Pieces", value: String(shipment.pieces) },
  ];

  return (
    <AppShell narrow>
      <AppPageHeader title="Shipment Details" backHref="/shipments" showMenu={false} />

      <div className="animate-fade-up space-y-5">
        <div className="rounded-2xl border border-border bg-surface-elevated p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-muted">Tracking Number</p>
              <p className="mt-1 text-lg font-semibold">{shipment.trackingNumber}</p>
            </div>
            <StatusBadge status={shipment.status} />
          </div>
          <p className="mt-3 text-sm text-muted">Last updated: {shipment.lastUpdated}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface-elevated p-5">
            <p className="text-sm font-medium text-gold">From</p>
            <p className="mt-2 font-semibold text-foreground">{shipment.from}</p>
            <p className="mt-1 text-sm text-muted">{shipment.fromDate}</p>
          </div>
          <div className="rounded-2xl border border-border bg-surface-elevated p-5">
            <p className="text-sm font-medium text-gold">To</p>
            <p className="mt-2 font-semibold text-foreground">{shipment.to}</p>
            <p className="mt-1 text-sm text-muted">{shipment.toDate}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface-elevated p-5">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
            Package Information
          </h2>
          <dl className="space-y-3">
            {packageRows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0"
              >
                <dt className="text-sm text-muted">{row.label}</dt>
                <dd className="text-sm font-semibold text-foreground">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <PrimaryButton type="button">Download Receipt</PrimaryButton>
      </div>
    </AppShell>
  );
}
