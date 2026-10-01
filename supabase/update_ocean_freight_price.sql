-- Update ONLY Ocean Freight to $20/shipment (Road and Air stay unchanged)
update public.pricing_plans
set price = 20
where slug = 'ocean-freight';
