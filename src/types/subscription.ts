export type SubscriptionCategory =
  | "streaming"
  | "musica"
  | "produtividade"
  | "saude"
  | "educacao"
  | "outros";

export type BillingCycle = "monthly" | "yearly";

export type Subscription = {
  id: string;
  user_id: string;
  name: string;
  price: number;
  category: SubscriptionCategory;
  service_color: string;
  next_renewal_date: string;
  billing_cycle: BillingCycle;
  created_at: string;
  updated_at: string;
};

export type SubscriptionSummary = Pick<
  Subscription,
  | "id"
  | "name"
  | "price"
  | "category"
  | "service_color"
  | "next_renewal_date"
  | "billing_cycle"
>;

export type SubscriptionNameSummary = Pick<Subscription, "id" | "name">;
