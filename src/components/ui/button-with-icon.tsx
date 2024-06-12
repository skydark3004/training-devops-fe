import { Mail, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function ButtonWithIcon() {
  return (
    <Button>
      <Search className='mr-2 h-4 w-4' /> Tìm kiếm
    </Button>
  );
}
