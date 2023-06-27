import React from 'react';
import { Table, Tag } from 'antd';
const { Column } = Table;

const GroupTransaction = ({ ele }) => {
  return (
    <Table dataSource={ele}>
      <Column title='Amount' dataIndex='amount' key='amount' />
      <Column title='Description' dataIndex='description' key='description' />
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
  );
};

export default GroupTransaction;
