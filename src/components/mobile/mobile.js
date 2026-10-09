import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'antd';
import { trackPendoEvent } from '../../utils/pendo';

import './mobile.scss';

export default class Mobile extends React.Component {
  UNSAFE_componentWillMount() {
    this.props.onPageUpdate('Mobile');
  }

  _onToggleUI(e) {
    e.preventDefault();

    try {
      // Hide
      if (e.target.innerText === 'HIDE UI') {
        // Update button
        e.target.innerText = 'SHOW UI';

        // Left nav
        document.querySelector('.nav-bar').style.display = 'none';
        document.querySelector('.nav-bar').style.width = '0px';

        // Body container
        document.querySelector('.body-container').style.marginLeft = '0px';
        document.querySelector('.body-container').style.width = '100%';

        // App container
        document.querySelector('.app-container').style.width =
          'calc(100% - 30px)';

        // Footer
        document.querySelector(
          '.pendo-sales-engineering-footer'
        ).style.display = 'none';

        // Feedback
        document.querySelector('#feedback-trigger').style.display = 'none';

        // Resource center
        document.querySelector(
          '._pendo-resource-center-badge-container'
        ).style.boxShadow = 'none';
        document.querySelector(
          '._pendo-resource-center-badge-image'
        ).style.display = 'none';
        document.querySelector(
          '.pendo-resource-center-badge-notification-bubble'
        ).style.display = 'none';
      }
      // Show
      else {
        // Update button
        e.target.innerText = 'HIDE UI';

        // Left nav
        document.querySelector('.nav-bar').style.display = 'initial';
        document.querySelector('.nav-bar').style.width = '240px';

        // Body container
        document.querySelector('.body-container').style.marginLeft = '240px';
        document.querySelector('.body-container').style.width =
          'calc(100% - 240px)';

        // App container
        document.querySelector('.app-container').style.width =
          'calc(100% - 240px - 30px)';

        // Footer
        document.querySelector(
          '.pendo-sales-engineering-footer'
        ).style.display = 'initial';

        // Feedback
        document.querySelector('#feedback-trigger').style.display = 'initial';

        // Resource center
        document.querySelector(
          '._pendo-resource-center-badge-container'
        ).style.boxShadow = 'rgb(0 0 0 / 15%) 2px 0px 6px 0px';
        document.querySelector(
          '._pendo-resource-center-badge-image'
        ).style.display = 'initial';
        document.querySelector(
          '.pendo-resource-center-badge-notification-bubble'
        ).style.display = 'initial';
      }
    } catch (error) {}
  }

  _onlaunchMobileDemo() {
    const appetizeContainer = document.getElementById('mobileDemo');
    const settingsContainer = document.getElementById('demoLaunch');
    const iframe = document.createElement('iframe');
    const scale = Math.min(
      Math.floor(
        ((document.querySelector('.mobile-card-body').clientHeight - 48) /
          946.66) *
          100
      ),
      100
    );

    iframe.src = `https://appetize.io/embed/ag_yy3m7wknuu96nw0qd9ww7tr6z4?osVersion=13&device=iphone8plus&scale=${scale}&params=%7B%22visitorId%22%3A%22${this.props?.visInfo?.visitor?.id}%22%2C%22accountId%22%3A%22${this.props?.visInfo?.account?.id}%22%7D`;

    console.log(`iframe.src: ${iframe.src}`);

    iframe.id = 'iphone';
    iframe.title = 'Pendo Experience Mobile';
    iframe.width = '460px';
    iframe.height = `100%`;
    iframe.allow = 'clipboard-read; clipboard-write';
    iframe.frameBorder = '0';
    iframe.scrolling = 'no';

    appetizeContainer.appendChild(iframe);
    settingsContainer.style.display = 'none';

    // Pendo: Appetize session embedded. device/os_version are read back from
    // the embed URL; the has_* flags show whether real visitor/account IDs
    // were passed to the mobile session.
    const embedParams = new URL(iframe.src).searchParams;
    trackPendoEvent('Mobile Demo Launched', {
      scale,
      device: embedParams.get('device'),
      os_version: embedParams.get('osVersion'),
      has_visitor_id: Boolean(this.props?.visInfo?.visitor?.id),
      has_account_id: Boolean(this.props?.visInfo?.account?.id),
    });
  }

  render() {
    return (
      <div id="phoneContainer" className="ant-card">
        <div className="ant-card-head">
          <h1> ACME CRM Mobile Demo</h1>
          <Button
            type="primary"
            size="large"
            id="toggle-ui"
            onClick={(e) => this._onToggleUI(e)}
          >
            HIDE UI
          </Button>
        </div>
        <div
          className="ant-card-body mobile-card-body"
          style={{ height: 'calc(100% - 70px)' }}
        >
          <div id="demoLaunch">
            <button
              className="mobile-btn ant-btn ant-btn-primary ant-btn-md"
              id="launchPhone"
              type="button"
              onClick={(e) => this._onlaunchMobileDemo(e)}
            >
              Launch Mobile Demo
            </button>
          </div>

          <section id="mobileDemo"></section>
        </div>
      </div>
    );
  }
}

Mobile.propTypes = {
  onPageUpdate: PropTypes.func,
  visInfo: PropTypes.object,
};
