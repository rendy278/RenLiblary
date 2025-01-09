interface SearchUserProps {
  query: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchUser: React.FC<SearchUserProps> = ({ query, onSearch }) => {
  return (
    <div className="flex mb-4 items-center">
      <input
        type="text"
        value={query}
        onChange={onSearch}
        placeholder="Search users..."
        className="border border-gray-300 rounded p-2 w-full md:w-64"
      />
    </div>
  );
};

export default SearchUser;
