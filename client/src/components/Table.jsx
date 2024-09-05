import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

const Table = (props) => {
	const { tableData } = props;

	return (
		<DataTableExtensions
			{...tableData}
			filterPlaceholder='Ara...'
			export={false}
			print={false}>
			<DataTable
				{...tableData}
				noDataComponent={<p>Kayıt bulunamadı.</p>}
				dense
				direction='auto'
				highlightOnHover
				pagination
				responsive
				striped
			/>
		</DataTableExtensions>
	);
};
export default Table;
