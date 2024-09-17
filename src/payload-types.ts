/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

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
      keywords?: string | null;
      image?: (number | null) | Card;
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
    avatars: Avatar;
    cards: Card;
    landscapes: Landscape;
    portraits: Portrait;
    files: File;
    users: User;
    redirects: Redirect;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  db: {
    defaultIDType: number;
  };
  globals: {
    header: Header;
    footer: Footer;
    'company-info': CompanyInfo;
  };
  locale: null;
  user: User & {
    collection: 'users';
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
  id: number;
  title: string;
  layout: (Hero | ServicesBlock | CarfBlock | DonateBlock | TeamBlock | AboutUsBlock | LinksBlock)[];
  meta?: {
    hideFromSearchEngines?: boolean | null;
    metadata?: {
      title?: string | null;
      image?: (number | null) | Card;
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
    phoneNumber: string;
    links?:
      | {
          link: {
            type?: ('reference' | 'custom') | null;
            newTab?: boolean | null;
            reference?:
              | ({
                  relationTo: 'pages';
                  value: number | Page;
                } | null)
              | ({
                  relationTo: 'files';
                  value: number | File;
                } | null);
            url?: string | null;
            label: string;
            appearance?: ('default' | 'outline') | null;
          };
          id?: string | null;
        }[]
      | null;
    image: number | Landscape;
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
 * via the `definition` "files".
 */
export interface File {
  id: number;
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
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "landscapes".
 */
export interface Landscape {
  id: number;
  alt: string;
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
  };
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
  services?: {
    topThreeServices: (number | Service)[];
    links?:
      | {
          link: {
            type?: ('reference' | 'custom') | null;
            newTab?: boolean | null;
            reference?:
              | ({
                  relationTo: 'pages';
                  value: number | Page;
                } | null)
              | ({
                  relationTo: 'files';
                  value: number | File;
                } | null);
            url?: string | null;
            label: string;
            appearance?: ('default' | 'outline') | null;
          };
          id?: string | null;
        }[]
      | null;
  };
  id?: string | null;
  blockName?: string | null;
  blockType: 'services';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "services".
 */
export interface Service {
  id: number;
  title: string;
  desc: string;
  icon: string;
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
  image?: (number | null) | Card;
  id?: string | null;
  blockName?: string | null;
  blockType: 'carf';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "cards".
 */
export interface Card {
  id: number;
  alt: string;
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
  };
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
  teamMembers?: (number | Team)[] | null;
  reverse?: boolean | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'team';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "team".
 */
export interface Team {
  id: number;
  memberType?: ('staff' | 'board') | null;
  name: string;
  avatar: number | Avatar;
  image: number | Portrait;
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
      image?: (number | null) | Card;
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
 * via the `definition` "avatars".
 */
export interface Avatar {
  id: number;
  alt: string;
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
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "portraits".
 */
export interface Portrait {
  id: number;
  alt: string;
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
  };
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
  images?: (number | Landscape)[] | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'aboutUs';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "LinksBlock".
 */
export interface LinksBlock {
  hero?: Hero[] | null;
  linkCards?: LinkCards;
  id?: string | null;
  blockName?: string | null;
  blockType: 'linksBlock';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
  name?: string | null;
  role: string;
  updatedAt: string;
  createdAt: string;
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
  id: number;
  from: string;
  to?: {
    type?: ('reference' | 'custom') | null;
    reference?:
      | ({
          relationTo: 'pages';
          value: number | Page;
        } | null)
      | ({
          relationTo: 'team';
          value: number | Team;
        } | null);
    url?: string | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'users';
    value: number | User;
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
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "header".
 */
export interface Header {
  id: number;
  navItems?:
    | {
        link: {
          type?: ('reference' | 'custom') | null;
          newTab?: boolean | null;
          reference?:
            | ({
                relationTo: 'pages';
                value: number | Page;
              } | null)
            | ({
                relationTo: 'files';
                value: number | File;
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
  id: number;
  columns?:
    | {
        columnType: 'pageLinks' | 'contactInfo' | 'googleMap';
        pageLinks?:
          | {
              link: {
                type?: ('reference' | 'custom') | null;
                newTab?: boolean | null;
                reference?:
                  | ({
                      relationTo: 'pages';
                      value: number | Page;
                    } | null)
                  | ({
                      relationTo: 'files';
                      value: number | File;
                    } | null);
                url?: string | null;
                label: string;
              };
              id?: string | null;
            }[]
          | null;
        contact?: {
          showContact?: boolean | null;
        };
        googleMap?: {
          apiKey: string;
        };
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "company-info".
 */
export interface CompanyInfo {
  id: number;
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
                value: number | Page;
              } | null)
            | ({
                relationTo: 'files';
                value: number | File;
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
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}