import {useData} from '../../hooks/UseData';

export const DataLoader = () =>{
  console.log(`render DataLoader`);

  const data = useData();
  return (
    <div>
      <div>Data is { JSON.stringify(data) }</div>
    </div>
  );
}