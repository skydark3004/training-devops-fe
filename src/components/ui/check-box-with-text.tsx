'use client';

import { Checkbox } from '@/components/ui/checkbox';

export function CheckboxWithText(props: { text: string }) {
  return (
    <div className='items-top flex space-x-2'>
      <Checkbox id='terms1' />
      <div className='grid gap-1.5 leading-none'>
        <label htmlFor='terms1' className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
          {props.text}
        </label>
      </div>
    </div>
  );
}
