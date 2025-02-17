export const SidebarItem = ({ title, children, isOpen, toggle, icon }: any) => (
  <div>
    <div className='flex items-center justify-between p-2 hover:bg-gray-200 cursor-pointer' onClick={toggle}>
      <span className='font-bold'>
        {icon}
        {title}
      </span>
      {isOpen ? (
        <img src='/sidebar/icon-up-line.png' width={20} alt='search' className='logo'></img>
      ) : (
        <img src='/sidebar/icon-down-line.png' width={20} alt='search' className='logo'></img>
      )}
    </div>
    {isOpen && <div className='pl-4'>{children}</div>}
  </div>
);
