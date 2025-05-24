CREATE TABLE public.subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  user_id uuid NOT NULL, -- 关联 supabase 用户
  stripe_subscription_id text, -- Stripe 订阅ID
  stripe_customer_id text,     -- Stripe 客户ID
  status text,                 -- Stripe 订阅状态
  plan text,                   -- 订阅类型（如 pro, free, annual, monthly）
  credits integer,             -- 可选，积分/额度
  current_period_start timestamptz,
  current_period_end timestamptz,
  canceled_at timestamptz,
  cancel_at timestamptz,
  language text                -- 可选，用户语言
);

-- 可选：为 user_id 建索引
CREATE INDEX idx_subscriptions_user_id ON public.subscriptions(user_id);



CREATE TABLE public.waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  email text NOT NULL,
  user_id uuid
);
-- 可选：为 email 建唯一索引，防止重复
CREATE UNIQUE INDEX idx_waitlist_email ON public.waitlist(email);


CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  full_name text,
  avatar_url text,
  language text
);
