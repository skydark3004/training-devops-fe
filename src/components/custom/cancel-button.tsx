import { Button } from '@/components/ui/button';

import { useRouter } from 'next/navigation';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export interface IProps {
  className?: string | undefined;
  title: string;
  isEdited: boolean;
  linkToListPage: string;
}

export const CancelButton = ({ className, title, isEdited, linkToListPage }: IProps) => {
  const router = useRouter();

  if (isEdited) {
    return (
      <Dialog>
        <DialogTrigger>
          <Button className={className} type='button'>
            Hủy
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='mt-5'>{title}</DialogTitle>
            {/*           <DialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our servers.
            </DialogDescription> */}
          </DialogHeader>
          <DialogFooter className='mt-5'>
            <DialogClose asChild className='mr-5'>
              <Button type='button' variant='outline'>
                Không
              </Button>
            </DialogClose>

            <Button className={className} type='button' onClick={() => router.push(linkToListPage)}>
              Hủy
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Button className={className} type='button' onClick={() => router.push(linkToListPage)}>
      Hủy
    </Button>
  );
};
