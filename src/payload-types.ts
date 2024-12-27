/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "LinkGroup".
 */
export type LinkGroup =
  | {
      link: {
        type?: ('reference' | 'custom') | null;
        newTab?: boolean | null;
        reference?:
          | ({
              relationTo: 'pages';
              value: string | Page;
            } | null)
          | ({
              relationTo: 'media';
              value: string | Media;
            } | null);
        url?: string | null;
        label: string;
        /**
         * Choose how the link should be rendered.
         */
        appearance?: ('default' | 'outline') | null;
      };
      id?: string | null;
    }[]
  | null;
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "LinkCards".
 */
export type LinkCards =
  | {
      linkType?: ('link' | 'video') | null;
      title: string;
      description: string;
      imageUploadOption?: ('generate' | 'manual') | null;
      /**
       * Coma seperated words
       */
      keywords?: string | null;
      image?: (string | null) | Media;
      href: string;
      id?: string | null;
    }[]
  | null;

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    pages: Page;
    services: Service;
    team: Team;
    media: Media;
    users: User;
    redirects: Redirect;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    pages: PagesSelect<false> | PagesSelect<true>;
    services: ServicesSelect<false> | ServicesSelect<true>;
    team: TeamSelect<false> | TeamSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    users: UsersSelect<false> | UsersSelect<true>;
    redirects: RedirectsSelect<false> | RedirectsSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: string;
  };
  globals: {
    header: Header;
    footer: Footer;
    'company-info': CompanyInfo;
  };
  globalsSelect: {
    header: HeaderSelect<false> | HeaderSelect<true>;
    footer: FooterSelect<false> | FooterSelect<true>;
    'company-info': CompanyInfoSelect<false> | CompanyInfoSelect<true>;
  };
  locale: null;
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: string;
  title: string;
  layout: (
    | Hero
    | RichTextBlock
    | ServicesBlock
    | CarfBlock
    | DonateBlock
    | TeamBlock
    | AboutUsBlock
    | LinksBlock
    | FormBlock
    | TwoColumnLayoutBlock
  )[];
  meta?: {
    hideFromSearchEngines?: boolean | null;
    metadata?: {
      title?: string | null;
      /**
       * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
       */
      image?: (string | null) | Media;
      description?: string | null;
    };
  };
  publishedAt?: string | null;
  slug?: string | null;
  slugLock?: boolean | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Hero".
 */
export interface Hero {
  type: 'highImpact' | 'mediumImpact';
  highImpact?: {
    title: string;
    description: string;
    /**
     * Phone number for 'Call Now' cta on mobile.
     */
    phoneNumber: string;
    links?: LinkGroup;
    image: string | Media;
    svg?: boolean | null;
  };
  mediumImpact?: {
    subtitle?: string | null;
    title: string;
    description?: string | null;
  };
  id?: string | null;
  blockName?: string | null;
  blockType: 'hero';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  /**
   * Alternative text for SEO and accessibility
   */
  alt: string;
  caption?: string | null;
  prefix?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    meta?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "RichTextBlock".
 */
export interface RichTextBlock {
  subtitle?: string | null;
  richContent?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  images?: (string | Media)[] | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'richText';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ServicesBlock".
 */
export interface ServicesBlock {
  subtitle: string;
  title: string;
  description: string;
  gridSVG: boolean;
  howMany: 'topThreeServices' | 'allServices';
  /**
   * Select and sort the top 3 services
   */
  topThreeServices?: (string | Service)[] | null;
  /**
   * Select and sort all your available services
   */
  allServices?: (string | Service)[] | null;
  links?: LinkGroup;
  id?: string | null;
  blockName?: string | null;
  blockType: 'services';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "services".
 */
export interface Service {
  id: string;
  title: string;
  desc: string;
  icon?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "CarfBlock".
 */
export interface CarfBlock {
  subtitle?: string | null;
  title?: string | null;
  description?: string | null;
  image?: (string | null) | Media;
  id?: string | null;
  blockName?: string | null;
  blockType: 'carf';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "DonateBlock".
 */
export interface DonateBlock {
  subtitle?: string | null;
  title?: string | null;
  description?: string | null;
  programs?:
    | {
        title?: string | null;
        id?: string | null;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'donate';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "TeamBlock".
 */
export interface TeamBlock {
  memberType?: ('staff' | 'board') | null;
  title?: string | null;
  description?: string | null;
  teamMembers?: (string | Team)[] | null;
  reverse?: boolean | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'team';
}
/**
 * A collection of staff and board members.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "team".
 */
export interface Team {
  id: string;
  memberType?: ('staff' | 'board') | null;
  name: string;
  image: string | Media;
  role: string;
  qualifications?: string | null;
  bio: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  meta?: {
    hideFromSearchEngines?: boolean | null;
    metadata?: {
      title?: string | null;
      /**
       * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
       */
      image?: (string | null) | Media;
      description?: string | null;
    };
  };
  publishedAt?: string | null;
  slug?: string | null;
  slugLock?: boolean | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "AboutUsBlock".
 */
export interface AboutUsBlock {
  subtitle?: string | null;
  richContent?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  images?: (string | Media)[] | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'aboutUs';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "LinksBlock".
 */
export interface LinksBlock {
  /**
   * Only use Medium Impact Hero.
   */
  hero?: Hero[] | null;
  linkCards?: LinkCards;
  id?: string | null;
  blockName?: string | null;
  blockType: 'linksBlock';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "FormBlock".
 */
export interface FormBlock {
  enableIntro?: boolean | null;
  introContent?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'formBlock';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "TwoColumnLayoutBlock".
 */
export interface TwoColumnLayoutBlock {
  /**
   * The direction of the layout
   */
  direction?: ('ltr' | 'rtl') | null;
  /**
   * The breakpoint at which the layout switches to a two column layout
   */
  breakpoint?: ('sm' | 'md' | 'lg' | 'xl') | null;
  columnOne?: {
    contentType?: ('cta' | 'richText') | null;
    verticalAlignment?: ('top' | 'center' | 'bottom') | null;
    richText?: {
      root: {
        type: string;
        children: {
          type: string;
          version: number;
          [k: string]: unknown;
        }[];
        direction: ('ltr' | 'rtl') | null;
        format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
        indent: number;
        version: number;
      };
      [k: string]: unknown;
    } | null;
    cta?: {
      hasSubtitle?: boolean | null;
      subtitle?: {
        icon?: string | null;
        text?: string | null;
      };
      title: string;
      heading?: ('h1' | 'h2') | null;
      description: string;
      links?: LinkGroup;
    };
  };
  columnTwo?: {
    contentType?: ('image' | 'form') | null;
    priority?: boolean | null;
    /**
     * Images will follow as user scrolls
     */
    sticky?: boolean | null;
    svg?: boolean | null;
    images?: (string | Media)[] | null;
    form?: FormBlock[] | null;
  };
  id?: string | null;
  blockName?: string | null;
  blockType: 'twoColumnLayout';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  name?: string | null;
  role?: ('user' | 'editor' | 'admin' | 'superAdmin') | null;
  updatedAt: string;
  createdAt: string;
  enableAPIKey?: boolean | null;
  apiKey?: string | null;
  apiKeyIndex?: string | null;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "redirects".
 */
export interface Redirect {
  id: string;
  /**
   * You will need to rebuild the website when changing this field.
   */
  from: string;
  to?: {
    type?: ('reference' | 'custom') | null;
    reference?:
      | ({
          relationTo: 'pages';
          value: string | Page;
        } | null)
      | ({
          relationTo: 'team';
          value: string | Team;
        } | null);
    url?: string | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: string;
  document?:
    | ({
        relationTo: 'pages';
        value: string | Page;
      } | null)
    | ({
        relationTo: 'services';
        value: string | Service;
      } | null)
    | ({
        relationTo: 'team';
        value: string | Team;
      } | null)
    | ({
        relationTo: 'media';
        value: string | Media;
      } | null)
    | ({
        relationTo: 'users';
        value: string | User;
      } | null)
    | ({
        relationTo: 'redirects';
        value: string | Redirect;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages_select".
 */
export interface PagesSelect<T extends boolean = true> {
  title?: T;
  layout?:
    | T
    | {
        hero?: T | HeroSelect<T>;
        richText?: T | RichTextBlockSelect<T>;
        services?: T | ServicesBlockSelect<T>;
        carf?: T | CarfBlockSelect<T>;
        donate?: T | DonateBlockSelect<T>;
        team?: T | TeamBlockSelect<T>;
        aboutUs?: T | AboutUsBlockSelect<T>;
        linksBlock?: T | LinksBlockSelect<T>;
        formBlock?: T | FormBlockSelect<T>;
        twoColumnLayout?: T | TwoColumnLayoutBlockSelect<T>;
      };
  meta?:
    | T
    | {
        hideFromSearchEngines?: T;
        metadata?:
          | T
          | {
              title?: T;
              image?: T;
              description?: T;
            };
      };
  publishedAt?: T;
  slug?: T;
  slugLock?: T;
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Hero_select".
 */
export interface HeroSelect<T extends boolean = true> {
  type?: T;
  highImpact?:
    | T
    | {
        title?: T;
        description?: T;
        phoneNumber?: T;
        links?: T | LinkGroupSelect<T>;
        image?: T;
        svg?: T;
      };
  mediumImpact?:
    | T
    | {
        subtitle?: T;
        title?: T;
        description?: T;
      };
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "LinkGroup_select".
 */
export interface LinkGroupSelect<T extends boolean = true> {
  link?:
    | T
    | {
        type?: T;
        newTab?: T;
        reference?: T;
        url?: T;
        label?: T;
        appearance?: T;
      };
  id?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "RichTextBlock_select".
 */
export interface RichTextBlockSelect<T extends boolean = true> {
  subtitle?: T;
  richContent?: T;
  images?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ServicesBlock_select".
 */
export interface ServicesBlockSelect<T extends boolean = true> {
  subtitle?: T;
  title?: T;
  description?: T;
  gridSVG?: T;
  howMany?: T;
  topThreeServices?: T;
  allServices?: T;
  links?: T | LinkGroupSelect<T>;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "CarfBlock_select".
 */
export interface CarfBlockSelect<T extends boolean = true> {
  subtitle?: T;
  title?: T;
  description?: T;
  image?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "DonateBlock_select".
 */
export interface DonateBlockSelect<T extends boolean = true> {
  subtitle?: T;
  title?: T;
  description?: T;
  programs?:
    | T
    | {
        title?: T;
        id?: T;
      };
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "TeamBlock_select".
 */
export interface TeamBlockSelect<T extends boolean = true> {
  memberType?: T;
  title?: T;
  description?: T;
  teamMembers?: T;
  reverse?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "AboutUsBlock_select".
 */
export interface AboutUsBlockSelect<T extends boolean = true> {
  subtitle?: T;
  richContent?: T;
  images?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "LinksBlock_select".
 */
export interface LinksBlockSelect<T extends boolean = true> {
  hero?:
    | T
    | {
        hero?: T | HeroSelect<T>;
      };
  linkCards?: T | LinkCardsSelect<T>;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "LinkCards_select".
 */
export interface LinkCardsSelect<T extends boolean = true> {
  linkType?: T;
  title?: T;
  description?: T;
  imageUploadOption?: T;
  keywords?: T;
  image?: T;
  href?: T;
  id?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "FormBlock_select".
 */
export interface FormBlockSelect<T extends boolean = true> {
  enableIntro?: T;
  introContent?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "TwoColumnLayoutBlock_select".
 */
export interface TwoColumnLayoutBlockSelect<T extends boolean = true> {
  direction?: T;
  breakpoint?: T;
  columnOne?:
    | T
    | {
        contentType?: T;
        verticalAlignment?: T;
        richText?: T;
        cta?:
          | T
          | {
              hasSubtitle?: T;
              subtitle?:
                | T
                | {
                    icon?: T;
                    text?: T;
                  };
              title?: T;
              heading?: T;
              description?: T;
              links?: T | LinkGroupSelect<T>;
            };
      };
  columnTwo?:
    | T
    | {
        contentType?: T;
        priority?: T;
        sticky?: T;
        svg?: T;
        images?: T;
        form?:
          | T
          | {
              formBlock?: T | FormBlockSelect<T>;
            };
      };
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "services_select".
 */
export interface ServicesSelect<T extends boolean = true> {
  title?: T;
  desc?: T;
  icon?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "team_select".
 */
export interface TeamSelect<T extends boolean = true> {
  memberType?: T;
  name?: T;
  image?: T;
  role?: T;
  qualifications?: T;
  bio?: T;
  meta?:
    | T
    | {
        hideFromSearchEngines?: T;
        metadata?:
          | T
          | {
              title?: T;
              image?: T;
              description?: T;
            };
      };
  publishedAt?: T;
  slug?: T;
  slugLock?: T;
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  caption?: T;
  prefix?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
  sizes?:
    | T
    | {
        thumbnail?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        meta?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
      };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  name?: T;
  role?: T;
  updatedAt?: T;
  createdAt?: T;
  enableAPIKey?: T;
  apiKey?: T;
  apiKeyIndex?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "redirects_select".
 */
export interface RedirectsSelect<T extends boolean = true> {
  from?: T;
  to?:
    | T
    | {
        type?: T;
        reference?: T;
        url?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "header".
 */
export interface Header {
  id: string;
  navItems?:
    | {
        link: {
          type?: ('reference' | 'custom') | null;
          newTab?: boolean | null;
          reference?:
            | ({
                relationTo: 'pages';
                value: string | Page;
              } | null)
            | ({
                relationTo: 'media';
                value: string | Media;
              } | null);
          url?: string | null;
          label: string;
        };
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "footer".
 */
export interface Footer {
  id: string;
  pageLinks?:
    | {
        link: {
          type?: ('reference' | 'custom') | null;
          newTab?: boolean | null;
          reference?:
            | ({
                relationTo: 'pages';
                value: string | Page;
              } | null)
            | ({
                relationTo: 'media';
                value: string | Media;
              } | null);
          url?: string | null;
          label: string;
        };
        id?: string | null;
      }[]
    | null;
  showContact?: boolean | null;
  showGoogleMap?: boolean | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * Update business information.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "company-info".
 */
export interface CompanyInfo {
  id: string;
  /**
   * Company contact information.
   */
  contact?: {
    phone?: string | null;
    fax?: string | null;
    address?: string | null;
    googleMapLink?: string | null;
    email?: string | null;
  };
  social?:
    | {
        platform?: string | null;
        link: {
          type?: ('reference' | 'custom') | null;
          newTab?: boolean | null;
          reference?:
            | ({
                relationTo: 'pages';
                value: string | Page;
              } | null)
            | ({
                relationTo: 'media';
                value: string | Media;
              } | null);
          url?: string | null;
          label: string;
        };
        id?: string | null;
      }[]
    | null;
  hours?:
    | {
        type?: ('default' | 'custom') | null;
        day?: string | null;
        hours?: string | null;
        note?: string | null;
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "header_select".
 */
export interface HeaderSelect<T extends boolean = true> {
  navItems?:
    | T
    | {
        link?:
          | T
          | {
              type?: T;
              newTab?: T;
              reference?: T;
              url?: T;
              label?: T;
            };
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "footer_select".
 */
export interface FooterSelect<T extends boolean = true> {
  pageLinks?:
    | T
    | {
        link?:
          | T
          | {
              type?: T;
              newTab?: T;
              reference?: T;
              url?: T;
              label?: T;
            };
        id?: T;
      };
  showContact?: T;
  showGoogleMap?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "company-info_select".
 */
export interface CompanyInfoSelect<T extends boolean = true> {
  contact?:
    | T
    | {
        phone?: T;
        fax?: T;
        address?: T;
        googleMapLink?: T;
        email?: T;
      };
  social?:
    | T
    | {
        platform?: T;
        link?:
          | T
          | {
              type?: T;
              newTab?: T;
              reference?: T;
              url?: T;
              label?: T;
            };
        id?: T;
      };
  hours?:
    | T
    | {
        type?: T;
        day?: T;
        hours?: T;
        note?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "MediaBlock".
 */
export interface MediaBlock {
  position?: ('default' | 'fullscreen') | null;
  media: string | Media;
  id?: string | null;
  blockName?: string | null;
  blockType: 'mediaBlock';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}