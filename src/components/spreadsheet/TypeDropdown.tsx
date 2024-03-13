import { observer } from "mobx-react";
import spreadsheetStore from "../../state/SheetStore";
import styles from "./TypeDropdown.module.css";

interface TypeDropdownProps {
  index: number;
}

const TypeDropdown: React.FC<TypeDropdownProps> = observer(({ index }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = event.target.value;
    spreadsheetStore.updateColumnType(index, newType);
  };

  return (
    <th
      key={`key_${index}`}
      className={styles.selectContainer}>
      <select
        className={styles.select}
        value={spreadsheetStore.columnTypes[index]}
        onChange={handleChange}>
        <option value="string">String</option>
        <option value="boolean">Boolean</option>
        <option value="number">Number</option>
        <option value="bigint">BigInt</option>
        <option value="null">Null</option>
      </select>
    </th>
  );
});

export default TypeDropdown;
