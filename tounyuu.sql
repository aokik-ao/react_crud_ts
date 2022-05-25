-- テーブル作成
CREATE TABLE public.categories
(
    id serial PRIMARY KEY,
    name character varying(30),
    regist_date timestamp with time zone,
    update_date timestamp with time zone
);

CREATE TABLE public.items
(
    id serial,
    category_id integer REFERENCES public.categories (id),
    name character varying(30),
    price numeric,
    point_ratio numeric,
    reserve_only_flag boolean,
    regist_date timestamp with time zone,
    update_date timestamp with time zone
);

-- categories
INSERT INTO public.categories(name, regist_date, update_date) VALUES ('PC本体', now(), now());
INSERT INTO public.categories(name, regist_date, update_date) VALUES ('マウス', now(), now());
INSERT INTO public.categories(name, regist_date, update_date) VALUES ('PCモニター', now(), now());
INSERT INTO public.categories(name, regist_date, update_date) VALUES ('清掃道具', now(), now());
INSERT INTO public.categories(name, regist_date, update_date) VALUES ('キーボード', now(), now());

-- items
INSERT INTO public.items(category_id, name, price, point_ratio, reserve_only_flag, regist_date, update_date) VALUES (1, 'thinkpad', 150000, 10, true, now(), now());
INSERT INTO public.items(category_id, name, price, point_ratio, reserve_only_flag, regist_date, update_date) VALUES (1, 'macbook', 120000, 5, false, now(), now());
INSERT INTO public.items(category_id, name, price, point_ratio, reserve_only_flag, regist_date, update_date) VALUES (2, 'スリムブレード', 10000, 10, false, now(), now());
INSERT INTO public.items(category_id, name, price, point_ratio, reserve_only_flag, regist_date, update_date) VALUES (2, 'ゲーミングマウス', 7000, 10, false, now(), now());
INSERT INTO public.items(category_id, name, price, point_ratio, reserve_only_flag, regist_date, update_date) VALUES (3, 'LG モニター', 20000, 10, false, now(), now());
INSERT INTO public.items(category_id, name, price, point_ratio, reserve_only_flag, regist_date, update_date) VALUES (4, 'クリーナークロス', 300, 10, false, now(), now());
INSERT INTO public.items(category_id, name, price, point_ratio, reserve_only_flag, regist_date, update_date) VALUES (4, 'エアダスター', 200, 10, false, now(), now());
INSERT INTO public.items(category_id, name, price, point_ratio, reserve_only_flag, regist_date, update_date) VALUES (5, 'hhkb', 25000, 5, false, now(), now());
INSERT INTO public.items(category_id, name, price, point_ratio, reserve_only_flag, regist_date, update_date) VALUES (5, 'リアルフォース', 28000, 10, true, now(), now());
INSERT INTO public.items(category_id, name, price, point_ratio, reserve_only_flag, regist_date, update_date) VALUES (5, 'razerキーボード', 10000, 5, true, now(), now());
