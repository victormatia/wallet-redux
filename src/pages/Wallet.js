import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import WalletFormEdit from '../components/WalletFormEdit';
import { getAllCurrencys } from '../redux/actions/currencyActions';
import Loading from '../components/Loading';
import '../css/Wallet.css';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getAllCurrencys());
  }

  render() {
    const { editor, loading } = this.props;
    return (
      <section>
        <section className="hero">
          <Header />
          { editor ? <WalletFormEdit /> : <WalletForm /> }
        </section>
        { loading ? <Loading /> : <Table /> }
      </section>
    );
  }
}

Wallet.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = ({ wallet }) => ({
  editor: wallet.editor,
  loading: wallet.loading,
});

export default connect(mapStateToProps)(Wallet);
