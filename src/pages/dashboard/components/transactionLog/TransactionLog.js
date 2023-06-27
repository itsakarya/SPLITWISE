import { Table } from 'antd';
import { Tag } from 'antd';
import { useSelector } from 'react-redux';
import { Collapse } from 'antd';
import GroupTransaction from './GroupTransaction';
import { filterTransactions } from '../../../summary/helper/helper';
import styles from './transactionLog.module.css';
const { Panel } = Collapse;
const { Column } = Table;

const TransactionLog = () => {
  const currentUser = useSelector(
    (reduxStore) => reduxStore.reduce.currentUser
  );
  const groups = useSelector((reduxStore) => reduxStore.groups.group);

  const totalTransaction = Object.keys(groups)
    .map((key) => groups[key].transaction)
    .reduce((previous, current) => previous.concat(current), []);

  const filteredTransaction = totalTransaction.filter(
    filterTransactions(currentUser)
  );

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <div className={styles.container}>
      <h1>Transactions:</h1>
      <h3>Group-Transaction</h3>
      <Collapse
        className={styles.panel}
        defaultActiveKey={['0']}
        onChange={onChange}
        ghost='true'
      >
        {Object.keys(groups).map((key, index) => {
          return (
            <Panel header={groups[key].groupName} key={index.toString()}>
              <GroupTransaction key={index} ele={groups[key].transaction} />
            </Panel>
          );
        })}
      </Collapse>
      <h3>Personal-Transaction</h3>
      <Collapse
        className={styles.panel}
        defaultActiveKey={['0']}
        onChange={onChange}
        ghost='true'
      >
        <Panel header='Personal-Transaction' key='0'>
          <Table dataSource={filteredTransaction}>
            <Column title='Amount' dataIndex='amount' key='amount' />
            <Column
              title='Description'
              dataIndex='description'
              key='description'
            />
            <Column title='Paid By' dataIndex='Paidby' key='Paidby' />

            <Column
              title='Split Between'
              dataIndex='PaidFor'
              key='PaidFor'
              render={(tags) => (
                <>
                  {tags.map((tag) => (
                    <Tag color='green' key={tag}>
                      {tag}
                    </Tag>
                  ))}
                </>
              )}
            />
          </Table>
        </Panel>
      </Collapse>
    </div>
  );
};

export default TransactionLog;
