import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Icon from '../elements/Icon';
import '@console/bluemix-components/consumables/scss/components/modals/modals.scss';

class Modal extends Component {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    passiveModal: PropTypes.bool,
    onRequestClose: PropTypes.func,
    id: PropTypes.string,
    modalHeading: PropTypes.string,
    modalLabel: PropTypes.string,
    secondaryButtonText: PropTypes.string,
    primaryButtonText: PropTypes.string,
    open: PropTypes.bool,
    onRequestSubmit: PropTypes.func,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    iconDescription: PropTypes.string,
  }

  static defaultProps = {
    onRequestClose: () => {},
    onRequestSubmit: () => {},
    onClick: () => {},
    onKeyDown: () => {},
    passiveModal: false,
    iconDescription: 'close the modal',

  };

  handleKeyDown = (evt) => {
    if (evt.which === 27) {
      this.props.onRequestClose();
    }
  };

  handleClick = (evt) => {
    const innerModal = this.refs.modalInner;
    const isTarget = innerModal.contains(evt.target);
    if (!isTarget) {
      this.props.onRequestClose();
    }
  }

  render() {
    const {
      modalHeading,
      modalLabel,
      passiveModal,
      secondaryButtonText,
      primaryButtonText,
      open,
      onRequestClose,
      onRequestSubmit,
      iconDescription,
      ...other,
    } = this.props;

    const modalClasses = classNames({
      'bx--modal': true,
      'bx--modal-tall': !passiveModal,
      'is-visible': open,
      [this.props.className]: this.props.className,
    });

    const modalLabelContent = (modalLabel)
      ? <h4 className="bx--modal-content__label">{modalLabel}</h4>
      : '';

    const modalBody = (passiveModal)
      ? (
      <div ref="modalInner" className="bx--modal-inner">
        <div className="bx--modal-content">
          <div className="bx--modal__header">
            <button className="bx--modal__close" type="button" onClick={onRequestClose}>
              <Icon name="close" className="bx--modal__close--icon" description={iconDescription} />
            </button>
            {modalLabelContent}
            <h2 className="bx--modal-content__heading">{modalHeading}</h2>
          </div>
          {this.props.children}
        </div>
      </div>)
      : (
      <div ref="modalInner" className="bx--modal-inner">
        {modalLabelContent}
        <h2 className="bx--modal-content__heading">{modalHeading}</h2>
        <button className="bx--modal__close" type="button" onClick={onRequestClose}>
          <Icon name="close" className="bx--modal__close--icon" description={iconDescription} />
        </button>
        <div className="bx--modal-content">
          {this.props.children}
        </div>
        <div className="bx--modal__buttons">
          <div className="bx--modal__buttons-container">
            <button className="bx--btn--secondary" type="button" onClick={onRequestClose}>{secondaryButtonText}</button>
            <button className="bx--btn" onClick={onRequestSubmit}>{primaryButtonText}</button>
          </div>
        </div>
      </div>);

    const modal = (
      <div
        {...other}
        onKeyDown={this.handleKeyDown}
        onClick={this.handleClick}
        className={modalClasses}
        tabIndex={-1}
      >
        {modalBody}
      </div>
    );

    return modal;
  }
}

export default Modal;