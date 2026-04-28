interface Props { title: string; subtitle?: string; }
export const PageHeader = ({ title, subtitle }: Props) => (
  <div className="mb-6">
    <h1 className="text-2xl md:text-3xl font-display font-bold">{title}</h1>
    {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
  </div>
);
