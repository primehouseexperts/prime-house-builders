
export interface ProjectConfig {
  id: string;
  folder: string;
  displayName: string;
  thumbnail: string;
}

export interface ProjectData extends ProjectConfig {
  descriptionHtml: string;
  images: string[];
}

export interface NavItem {
  label: string;
  href: string;
}
