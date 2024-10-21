PGDMP  8                	    |            true_gaming    16.4    16.4 9               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16604    true_gaming    DATABASE     ~   CREATE DATABASE true_gaming WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE true_gaming;
                root    false            �            1259    16673 	   categoria    TABLE     V   CREATE TABLE public.categoria (
    id_categoria integer NOT NULL,
    nombre text
);
    DROP TABLE public.categoria;
       public         heap    root    false            �            1259    16637 
   comentario    TABLE     �   CREATE TABLE public.comentario (
    id_comentario integer NOT NULL,
    id_resena integer,
    comentario text,
    fecha_comentario timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    correo_autor character varying(100)
);
    DROP TABLE public.comentario;
       public         heap    root    false            �            1259    16636    comentario_id_comentario_seq    SEQUENCE     �   CREATE SEQUENCE public.comentario_id_comentario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.comentario_id_comentario_seq;
       public          root    false    219                       0    0    comentario_id_comentario_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.comentario_id_comentario_seq OWNED BY public.comentario.id_comentario;
          public          root    false    218            �            1259    16680    genero    TABLE     P   CREATE TABLE public.genero (
    id_genero integer NOT NULL,
    nombre text
);
    DROP TABLE public.genero;
       public         heap    root    false            �            1259    16726    generos_juego    TABLE     e   CREATE TABLE public.generos_juego (
    id_juego integer NOT NULL,
    id_genero integer NOT NULL
);
 !   DROP TABLE public.generos_juego;
       public         heap    root    false            �            1259    16694    juego    TABLE     �   CREATE TABLE public.juego (
    id_juego integer NOT NULL,
    id_categoria integer,
    fecha_lanzamiento date,
    nombre text
);
    DROP TABLE public.juego;
       public         heap    root    false            �            1259    16657    likes    TABLE     |   CREATE TABLE public.likes (
    id_like integer NOT NULL,
    id_resena integer,
    correo_autor character varying(100)
);
    DROP TABLE public.likes;
       public         heap    root    false            �            1259    16656    likes_id_like_seq    SEQUENCE     �   CREATE SEQUENCE public.likes_id_like_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.likes_id_like_seq;
       public          root    false    221                       0    0    likes_id_like_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.likes_id_like_seq OWNED BY public.likes.id_like;
          public          root    false    220            �            1259    16687 
   plataforma    TABLE     X   CREATE TABLE public.plataforma (
    id_plataforma integer NOT NULL,
    nombre text
);
    DROP TABLE public.plataforma;
       public         heap    root    false            �            1259    16741    plataformas_juego    TABLE     m   CREATE TABLE public.plataformas_juego (
    id_juego integer NOT NULL,
    id_plataforma integer NOT NULL
);
 %   DROP TABLE public.plataformas_juego;
       public         heap    root    false            �            1259    16622    resena    TABLE        CREATE TABLE public.resena (
    id_resena integer NOT NULL,
    titulo character varying(100),
    id_juego integer,
    imagen text,
    resena text,
    puntuacion real,
    fecha_resena timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    correo_autor character varying(100)
);
    DROP TABLE public.resena;
       public         heap    root    false            �            1259    16621    resena_id_resena_seq    SEQUENCE     �   CREATE SEQUENCE public.resena_id_resena_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.resena_id_resena_seq;
       public          root    false    217            	           0    0    resena_id_resena_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.resena_id_resena_seq OWNED BY public.resena.id_resena;
          public          root    false    216            �            1259    16613    usuario    TABLE     5  CREATE TABLE public.usuario (
    correo character varying(100) NOT NULL,
    nickname character varying(50),
    contrasena character varying(100),
    avatar text,
    bio text,
    discord text,
    twitch text,
    youtube text,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.usuario;
       public         heap    root    false            C           2604    16640    comentario id_comentario    DEFAULT     �   ALTER TABLE ONLY public.comentario ALTER COLUMN id_comentario SET DEFAULT nextval('public.comentario_id_comentario_seq'::regclass);
 G   ALTER TABLE public.comentario ALTER COLUMN id_comentario DROP DEFAULT;
       public          root    false    219    218    219            E           2604    16660    likes id_like    DEFAULT     n   ALTER TABLE ONLY public.likes ALTER COLUMN id_like SET DEFAULT nextval('public.likes_id_like_seq'::regclass);
 <   ALTER TABLE public.likes ALTER COLUMN id_like DROP DEFAULT;
       public          root    false    220    221    221            A           2604    16625    resena id_resena    DEFAULT     t   ALTER TABLE ONLY public.resena ALTER COLUMN id_resena SET DEFAULT nextval('public.resena_id_resena_seq'::regclass);
 ?   ALTER TABLE public.resena ALTER COLUMN id_resena DROP DEFAULT;
       public          root    false    216    217    217            �          0    16673 	   categoria 
   TABLE DATA           9   COPY public.categoria (id_categoria, nombre) FROM stdin;
    public          root    false    222   �A       �          0    16637 
   comentario 
   TABLE DATA           j   COPY public.comentario (id_comentario, id_resena, comentario, fecha_comentario, correo_autor) FROM stdin;
    public          root    false    219   WB       �          0    16680    genero 
   TABLE DATA           3   COPY public.genero (id_genero, nombre) FROM stdin;
    public          root    false    223   tB       �          0    16726    generos_juego 
   TABLE DATA           <   COPY public.generos_juego (id_juego, id_genero) FROM stdin;
    public          root    false    226   �C       �          0    16694    juego 
   TABLE DATA           R   COPY public.juego (id_juego, id_categoria, fecha_lanzamiento, nombre) FROM stdin;
    public          root    false    225   �C       �          0    16657    likes 
   TABLE DATA           A   COPY public.likes (id_like, id_resena, correo_autor) FROM stdin;
    public          root    false    221   �C       �          0    16687 
   plataforma 
   TABLE DATA           ;   COPY public.plataforma (id_plataforma, nombre) FROM stdin;
    public          root    false    224   �C                  0    16741    plataformas_juego 
   TABLE DATA           D   COPY public.plataformas_juego (id_juego, id_plataforma) FROM stdin;
    public          root    false    227   �K       �          0    16622    resena 
   TABLE DATA           u   COPY public.resena (id_resena, titulo, id_juego, imagen, resena, puntuacion, fecha_resena, correo_autor) FROM stdin;
    public          root    false    217   L       �          0    16613    usuario 
   TABLE DATA           v   COPY public.usuario (correo, nickname, contrasena, avatar, bio, discord, twitch, youtube, fecha_creacion) FROM stdin;
    public          root    false    215   $L       
           0    0    comentario_id_comentario_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.comentario_id_comentario_seq', 1, false);
          public          root    false    218                       0    0    likes_id_like_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.likes_id_like_seq', 1, false);
          public          root    false    220                       0    0    resena_id_resena_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.resena_id_resena_seq', 1, false);
          public          root    false    216            O           2606    16679    categoria categoria_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT categoria_pkey PRIMARY KEY (id_categoria);
 B   ALTER TABLE ONLY public.categoria DROP CONSTRAINT categoria_pkey;
       public            root    false    222            K           2606    16645    comentario comentario_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.comentario
    ADD CONSTRAINT comentario_pkey PRIMARY KEY (id_comentario);
 D   ALTER TABLE ONLY public.comentario DROP CONSTRAINT comentario_pkey;
       public            root    false    219            Q           2606    16686    genero genero_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.genero
    ADD CONSTRAINT genero_pkey PRIMARY KEY (id_genero);
 <   ALTER TABLE ONLY public.genero DROP CONSTRAINT genero_pkey;
       public            root    false    223            W           2606    16730     generos_juego generos_juego_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public.generos_juego
    ADD CONSTRAINT generos_juego_pkey PRIMARY KEY (id_juego, id_genero);
 J   ALTER TABLE ONLY public.generos_juego DROP CONSTRAINT generos_juego_pkey;
       public            root    false    226    226            U           2606    16700    juego juego_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.juego
    ADD CONSTRAINT juego_pkey PRIMARY KEY (id_juego);
 :   ALTER TABLE ONLY public.juego DROP CONSTRAINT juego_pkey;
       public            root    false    225            M           2606    16662    likes likes_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id_like);
 :   ALTER TABLE ONLY public.likes DROP CONSTRAINT likes_pkey;
       public            root    false    221            S           2606    16693    plataforma plataforma_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.plataforma
    ADD CONSTRAINT plataforma_pkey PRIMARY KEY (id_plataforma);
 D   ALTER TABLE ONLY public.plataforma DROP CONSTRAINT plataforma_pkey;
       public            root    false    224            Y           2606    16745 (   plataformas_juego plataformas_juego_pkey 
   CONSTRAINT     {   ALTER TABLE ONLY public.plataformas_juego
    ADD CONSTRAINT plataformas_juego_pkey PRIMARY KEY (id_juego, id_plataforma);
 R   ALTER TABLE ONLY public.plataformas_juego DROP CONSTRAINT plataformas_juego_pkey;
       public            root    false    227    227            I           2606    16630    resena resena_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.resena
    ADD CONSTRAINT resena_pkey PRIMARY KEY (id_resena);
 <   ALTER TABLE ONLY public.resena DROP CONSTRAINT resena_pkey;
       public            root    false    217            G           2606    16620    usuario usuario_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (correo);
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public            root    false    215            Z           2606    16631    resena fk_correo_autor    FK CONSTRAINT     �   ALTER TABLE ONLY public.resena
    ADD CONSTRAINT fk_correo_autor FOREIGN KEY (correo_autor) REFERENCES public.usuario(correo);
 @   ALTER TABLE ONLY public.resena DROP CONSTRAINT fk_correo_autor;
       public          root    false    215    4679    217            \           2606    16646    comentario fk_correo_autor    FK CONSTRAINT     �   ALTER TABLE ONLY public.comentario
    ADD CONSTRAINT fk_correo_autor FOREIGN KEY (correo_autor) REFERENCES public.usuario(correo);
 D   ALTER TABLE ONLY public.comentario DROP CONSTRAINT fk_correo_autor;
       public          root    false    219    4679    215            ^           2606    16663    likes fk_correo_autor    FK CONSTRAINT        ALTER TABLE ONLY public.likes
    ADD CONSTRAINT fk_correo_autor FOREIGN KEY (correo_autor) REFERENCES public.usuario(correo);
 ?   ALTER TABLE ONLY public.likes DROP CONSTRAINT fk_correo_autor;
       public          root    false    221    4679    215            `           2606    16701    juego fk_id_categoria    FK CONSTRAINT     �   ALTER TABLE ONLY public.juego
    ADD CONSTRAINT fk_id_categoria FOREIGN KEY (id_categoria) REFERENCES public.categoria(id_categoria);
 ?   ALTER TABLE ONLY public.juego DROP CONSTRAINT fk_id_categoria;
       public          root    false    4687    225    222            a           2606    16736    generos_juego fk_id_genero    FK CONSTRAINT     �   ALTER TABLE ONLY public.generos_juego
    ADD CONSTRAINT fk_id_genero FOREIGN KEY (id_genero) REFERENCES public.genero(id_genero);
 D   ALTER TABLE ONLY public.generos_juego DROP CONSTRAINT fk_id_genero;
       public          root    false    223    226    4689            b           2606    16731    generos_juego fk_id_juego    FK CONSTRAINT        ALTER TABLE ONLY public.generos_juego
    ADD CONSTRAINT fk_id_juego FOREIGN KEY (id_juego) REFERENCES public.juego(id_juego);
 C   ALTER TABLE ONLY public.generos_juego DROP CONSTRAINT fk_id_juego;
       public          root    false    226    225    4693            [           2606    16756    resena fk_id_juego    FK CONSTRAINT     x   ALTER TABLE ONLY public.resena
    ADD CONSTRAINT fk_id_juego FOREIGN KEY (id_juego) REFERENCES public.juego(id_juego);
 <   ALTER TABLE ONLY public.resena DROP CONSTRAINT fk_id_juego;
       public          root    false    225    4693    217            c           2606    16746 (   plataformas_juego fk_id_juego_plataforma    FK CONSTRAINT     �   ALTER TABLE ONLY public.plataformas_juego
    ADD CONSTRAINT fk_id_juego_plataforma FOREIGN KEY (id_juego) REFERENCES public.juego(id_juego);
 R   ALTER TABLE ONLY public.plataformas_juego DROP CONSTRAINT fk_id_juego_plataforma;
       public          root    false    4693    225    227            d           2606    16751 "   plataformas_juego fk_id_plataforma    FK CONSTRAINT     �   ALTER TABLE ONLY public.plataformas_juego
    ADD CONSTRAINT fk_id_plataforma FOREIGN KEY (id_plataforma) REFERENCES public.plataforma(id_plataforma);
 L   ALTER TABLE ONLY public.plataformas_juego DROP CONSTRAINT fk_id_plataforma;
       public          root    false    4691    227    224            ]           2606    16651    comentario fk_id_resena    FK CONSTRAINT     �   ALTER TABLE ONLY public.comentario
    ADD CONSTRAINT fk_id_resena FOREIGN KEY (id_resena) REFERENCES public.resena(id_resena);
 A   ALTER TABLE ONLY public.comentario DROP CONSTRAINT fk_id_resena;
       public          root    false    4681    219    217            _           2606    16668    likes fk_id_resena    FK CONSTRAINT     {   ALTER TABLE ONLY public.likes
    ADD CONSTRAINT fk_id_resena FOREIGN KEY (id_resena) REFERENCES public.resena(id_resena);
 <   ALTER TABLE ONLY public.likes DROP CONSTRAINT fk_id_resena;
       public          root    false    217    4681    221            �   �   x�5�M
�0F�3�����Z���t3$#M'�MA��G�bb����^� j%�G�s�94�H:��X�aR�K8����51��n��2'�p�>�����SǸ�aL<�ɠ��s��Ŵ��ד��EВ�ДP�4��������;�      �      x������ � �      �     x�M��N1E뙯p�}(7	�!VdK��w^{{W���7h�c8��]�N�0�H���;i���XBÖ	+ؘ0���W�=��	�����KOo���k��w:��I��3�Q(���b���~�J�������rx��U�J��6w��3�h��Y	�DN��̈��ܟ**��|P�v��y	��GG�=�ܓ�`��ڻ�ф��%�G�xGb��3%o��Ƹ=Y�E��.y���u��(�M]J%<��-�Ʉ�R��ߣI"���H{��X��yU��%"�B`w�      �      x������ � �      �      x������ � �      �      x������ � �      �   �  x�}W�r�8=_����A-.�v�)Y���2U��1�D�����mU��w̏�Im�s��Ll�̗��.yTU�E9���VV�f>�yV��$���W*�u���Ya���HR�cڊV銆�sht#�Զ��NQ����[�v�|�R���Ȩ�X���u-Y�������>��j/�^�[�n��JY�,=6�,���;Ț��e�u9g�RǾ�KQʸ�I�8Čٝ>�X�����(3Ѵ���Y�!�[<�ٴ��Y������K2k��d��P&ʽ`+�o^�9]�J6���5L��u�a����+����ɬ�k�r�zê~n)EM���oso�h8cWH�FD���61f?(wȷ�R�%�l��S|H��s��p�挭j�٪��D�T�Ƒ��*Ny4�z]I�Yĝ�ك	��Z<����U�5�lr/JU_����\5燎y�ՙ�q�k��P�#�xyvd+�S�ds��/ Ϻ�e�~��z�sx�qPDf��s|ˢ�5JAh${�����Q�C�;8�wG9�L�͂�|�#ЀC�+Q�����{��p�S-��Q�sS@�#�B}��$�����v�#rw�>鲓CF_�H�/�W�}�'�E������K�
���ɺ>2�:�dL]��i�$���\s���o�>����xN��|�H
���)��8[@tȳܱ]�3�YNl=2�U�W:�s��ɦ�wzY��_۟��,���!�K�aH���i$��}0�)��ޛ,64�ɝ(���N� �ܫ5�O#~���)��G�y2�i��FA?
i��"f��2�3*)�����w���BW*k0�עj�OY��z�C�tc��q�{����gƮՏ}��S��})�Y����&��hU)'&sV����M8#���ϳ1�H<�Y|�a>�-�E���f��MJ@�%�>�Q�o��K�գ�پМ�-�v_��ׁx��E�T�L�C���\�I6���
uh�i�����m�gef/pKt�.[���'�X�m��~ػ�[�بӗp^pB�k�.
Ȁ@<	����V�6���S:	�Y�����& ��C�3lY_Yz8c""�%��T{�M�6�(�]�M����:�DT��x�i�:��V�_(��
��l�rO)�6EΥ> bˠ�a��Ջ�PP����{�s����Drۆ+�'�����΍^�.gI���Zi(d��l5G^�s�NB����o�1���6�4�8�6 �3J�j��B� �9I��,��³�<����:�`�����Rtz�u��(��W���$�gH_�M�L�=~&�$~��.ۮڳ�B쥂�= �M�v�ְ��5ցu�����	4��3A~���j��B�$E�Z���:4�}�䒴Esҏ9��cnz�-y�yT=������KU�[nz9����[�˿0�R�=B����G�;?�Ǉx�Y��@��K�G��:��4��E���k���d�}�+�I-�g��*�N�c�&���LM�1Ň������{&�\kh>�.j��C����V�Gw��Q���������^_B>֔���1D�#���X ��֠��"7�Ǚ!��:o\��a��rh,�0�z�3�N�^�٣����!�J0�M��fe�P���D7�pGœ�id��d+�it�.8v\�4�a�E�;S���s���xq(���n*����ޤ�.�h�m��Oc��q��v�Ќm�9׸m�tZ&398�wQ�o�wqfY���98C�a�{���,���<A��X��eH1�fD-��;���o�b86���!Ei�'���ۙG R��Ҳ������e%K�N�G�ھD_+�"�Q;}5q�pW�r�p�`����^%�hC�����ky���V���&�pP�\c{%��m�<c���r��l]٦kQ��,9v�e��jU���a
+�SS��p l��jW��!t=
􀳾�G��ɏ_�|�y��n��l������_�QJ�`F>�             x������ � �      �      x������ � �      �      x������ � �     