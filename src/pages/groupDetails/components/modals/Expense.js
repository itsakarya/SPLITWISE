import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Select, DatePicker } from 'antd';
import { Radio } from 'antd';
import { useDispatch } from 'react-redux';
import { addExpense } from '../../../../redux/gruop/addGroupAction';
import { useSelector } from 'react-redux';
import Styles from './expense.module.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: { background: 'rgba(0, 0, 0, 0.4)' },
};

const Expense = ({ expenseIsOpen, setExpenseIsOpen }) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const [desc, setDesc] = useState('');
  const [value, setValue] = useState([]);
  const [splittype, setSplitType] = useState('a');
  const [percentage, setPercentage] = useState(false);
  const [splitPerHead, setSplitPerHead] = useState({});
  const [msg, setMsg] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (splittype === 'b') {
      setPercentage(true);
    } else {
      setPercentage(false);
    }
  }, [splittype]);

  const setSplit = (name, value) => {
    setSplitPerHead((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const groupId = useSelector((reduxStore) => reduxStore.groups.group_id);
  const groups = useSelector((reduxStore) => reduxStore.groups.group);
  console.log(percentage);
  const alluser = groups[groupId].members;
  // console.log(alluser);
  const { Option } = Select;

  const children = [];
  if (alluser !== null) {
    Object.keys(alluser).forEach((element) => {
      children.push(<Option key={alluser[element]}>{alluser[element]}</Option>);
    });
  }
  const onChangeDate = (dateString) => {
    setDate(dateString);
  };

  const onChange = (value) => {
    setCategory(value);
  };
  const onSearch = (value) => {
    setCategory(value);
  };
  const handleSubmit = () => {
    console.log('inside handleSubmit Called');
    if (splittype === 'a') {
      const size = value.length;
      const perHead = 100 / size;
      value.map((name) => (splitPerHead[name] = perHead));
    }
    const t = Object.values(splitPerHead)?.reduce(
      (t, n) => Number(t) + Number(n)
    );

    if (t < 100 || t > 100) {
      setMsg('Summation of %-Share should be 100');
      return;
    } else {
      setMsg('');
    }
    const Paidby = document.getElementById('paidBy').selectedOptions;

    const valuesby = Array.from(Paidby).map(({ value }) => value);
    console.log(splitPerHead);
    dispatch(
      addExpense(amount, desc, valuesby, value, splitPerHead, category, date)
    );
    setExpenseIsOpen(false);
  };

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }
  function closeModal() {
    setExpenseIsOpen(false);
  }

  // console.log(alluser);

  return (
    <Modal
      isOpen={expenseIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel='Example Modal'
    >
      <div className='login'>
        <i className='bi bi-cash-stack'></i>
        <h1>Add Expense !</h1>
        <input
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          type='text'
          placeholder='Add Desc *'
          required
        />
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type='number'
          placeholder='Amount in Rupee *'
          required
        />
        <div className={Styles.splitAmong}>
          <h3>Date</h3>
          <DatePicker onChange={onChangeDate} />
        </div>
        <div className={Styles.splitAmong}>
          <h3>Category</h3>
          <Select
            showSearch
            placeholder='Select a category'
            // optionFilterProp='children'
            onChange={onChange}
            onSearch={onSearch}
            // filterOption={(input, option) =>
            //   (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            // }
            options={[
              {
                value: 'travel',
                label: 'travel',
              },
              {
                value: 'food',
                label: 'food',
              },
              {
                value: 'bill',
                label: 'bill',
              },
              {
                value: 'misc',
                label: 'misc',
              },
            ]}
          />
        </div>
        <div className={Styles.splitAmong}>
          <h3>Split among</h3>
          <Select
            mode='multiple'
            placeholder='Please select'
            onChange={(e) => setValue(e)}
            style={{ width: '170px' }}
          >
            {children}
          </Select>
        </div>

        <div className='paidByTo'>
          <div className={Styles.paidBy}>
            <h3>Paid by</h3>
            <select id='paidBy'>
              {alluser.map((x) => (
                <option value={x}>{x}</option>
              ))}
            </select>
          </div>
        </div>
        <div className={Styles.splitType}>
          <h3>Split-Type</h3>
          <Radio.Group
            defaultValue='a'
            buttonStyle='solid'
            onChange={(e) => setSplitType(e.target.value)}
          >
            <Radio.Button value='a'>=</Radio.Button>
            <Radio.Button value='b'>%</Radio.Button>
          </Radio.Group>
        </div>
        <div>
          {percentage &&
            value.map((name) => {
              return (
                <p>
                  {name} -
                  <input
                    value={splitPerHead[name]}
                    placeholder='%share'
                    onChange={(e) => setSplit(name, e.target.value)}
                  />
                </p>
              );
            })}
        </div>
        <p style={{ color: 'red' }}>{msg}</p>
        <button onClick={handleSubmit}>Add</button>
      </div>
    </Modal>
  );
};

export default Expense;
