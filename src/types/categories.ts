export interface Categories {
  id: string;
  name: string;
  description: null;
  parentId: null | string;
  createdAt: Date;
  updatedAt: Date;
  children: Categories[];
}
