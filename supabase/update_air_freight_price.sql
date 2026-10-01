-- Update ONLY Air Freight to $40/shipment (Road and Ocean stay unchanged)
update public.pricing_plans
set price = 40
where slug = 'air-freight';
