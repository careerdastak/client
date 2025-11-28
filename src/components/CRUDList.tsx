import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface CRUDListProps<T> {
  title: string;
  description: string;
  items: T[];
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  renderItem: (item: T) => React.ReactNode;
  idKey: keyof T;
}

export function CRUDList<T>({ title, description, items, onEdit, onDelete, renderItem, idKey }: CRUDListProps<T>) {
  if (items.length === 0) {
    return null;
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={String(item[idKey])} className="p-4 border rounded-lg">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">{renderItem(item)}</div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(item)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => onDelete(item)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
