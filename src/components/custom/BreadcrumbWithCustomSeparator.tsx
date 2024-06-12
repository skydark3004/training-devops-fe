import { Breadcrumb, BreadcrumbList } from '@/components/ui/breadcrumb';

export function BreadcrumbWithCustomSeparator(props: { children: React.ReactNode }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>{props.children}</BreadcrumbList>
    </Breadcrumb>
  );
}
