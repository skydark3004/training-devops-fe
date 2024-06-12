import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

interface IProps {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

function PaginationCustom({ currentPage, totalPage, onPageChange }: IProps) {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPage) {
      onPageChange(page);
    }
  };

  const isCurrentPage = (i: number) => i === currentPage;

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPage <= 5) {
      for (let i = 1; i <= totalPage; i++) {
        pageNumbers.push(
          <PaginationItem key={i}>
            <PaginationLink
              href='#'
              isActive={i === currentPage}
              className={isCurrentPage(i) ? 'bg-blue-200 pointer-events-none' : ''}
              onClick={() => {
                !isCurrentPage(i) && handlePageChange(i);
              }}>
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(
            <PaginationItem key={i}>
              <PaginationLink
                href='#'
                isActive={i === currentPage}
                className={isCurrentPage(i) ? 'bg-blue-200 pointer-events-none' : ''}
                onClick={() => {
                  !isCurrentPage(i) && handlePageChange(i);
                }}>
                {i}
              </PaginationLink>
            </PaginationItem>,
          );
        }
        pageNumbers.push(
          <PaginationItem key='ellipsis1'>
            <PaginationEllipsis />
          </PaginationItem>,
        );
        pageNumbers.push(
          <PaginationItem key={totalPage}>
            <PaginationLink href='#' onClick={() => handlePageChange(totalPage)}>
              {totalPage}
            </PaginationLink>
          </PaginationItem>,
        );
      } else if (currentPage > totalPage - 3) {
        pageNumbers.push(
          <PaginationItem key={1}>
            <PaginationLink href='#' onClick={() => handlePageChange(1)}>
              1
            </PaginationLink>
          </PaginationItem>,
        );
        pageNumbers.push(
          <PaginationItem key='ellipsis2'>
            <PaginationEllipsis />
          </PaginationItem>,
        );
        for (let i = totalPage - 3; i <= totalPage; i++) {
          pageNumbers.push(
            <PaginationItem key={i}>
              <PaginationLink
                href='#'
                isActive={i === currentPage}
                className={isCurrentPage(i) ? 'bg-blue-200 pointer-events-none' : ''}
                onClick={() => {
                  !isCurrentPage(i) && handlePageChange(i);
                }}>
                {i}
              </PaginationLink>
            </PaginationItem>,
          );
        }
      } else {
        pageNumbers.push(
          <PaginationItem key={1}>
            <PaginationLink href='#' onClick={() => handlePageChange(1)}>
              1
            </PaginationLink>
          </PaginationItem>,
        );
        pageNumbers.push(
          <PaginationItem key='ellipsis3'>
            <PaginationEllipsis />
          </PaginationItem>,
        );
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(
            <PaginationItem key={i}>
              <PaginationLink
                href='#'
                isActive={i === currentPage}
                className={isCurrentPage(i) ? 'bg-blue-200 pointer-events-none' : ''}
                onClick={() => {
                  !isCurrentPage(i) && handlePageChange(i);
                }}>
                {i}
              </PaginationLink>
            </PaginationItem>,
          );
        }
        pageNumbers.push(
          <PaginationItem key='ellipsis4'>
            <PaginationEllipsis />
          </PaginationItem>,
        );
        pageNumbers.push(
          <PaginationItem key={totalPage}>
            <PaginationLink href='#' onClick={() => handlePageChange(totalPage)}>
              {totalPage}
            </PaginationLink>
          </PaginationItem>,
        );
      }
    }

    return pageNumbers;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href='#'
            onClick={() => handlePageChange(currentPage - 1)}
            className={cn('gap-1 pl-2.5', currentPage === 1 ? ['pointer-events-none opacity-50'] : [])}
            aria-disabled={currentPage === 1}
            tabIndex={currentPage === 1 ? -1 : undefined}
          />
        </PaginationItem>
        {renderPageNumbers()}
        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(currentPage + 1)}
            className={cn('gap-1 pl-2.5', currentPage === totalPage ? ['pointer-events-none opacity-50'] : [])}
            href='#'
            aria-disabled={currentPage === totalPage}
            tabIndex={currentPage === totalPage ? -1 : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationCustom;
