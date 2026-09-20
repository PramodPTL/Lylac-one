package com.salesmanager.core.model.storefront;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "STORE_PAYMENT_CONFIG")
public class StorePaymentConfig extends StorefrontEntity {
    private Boolean codEnabled = true, onlinePaymentEnabled = true, upiEnabled = true;
    private String paymentProvider, configuration;
    private Boolean active = true;

    public Boolean getCodEnabled() {
        return codEnabled;
    }

    public void setCodEnabled(Boolean value) {
        codEnabled = value;
    }

    public Boolean getOnlinePaymentEnabled() {
        return onlinePaymentEnabled;
    }

    public void setOnlinePaymentEnabled(Boolean value) {
        onlinePaymentEnabled = value;
    }

    public Boolean getUpiEnabled() {
        return upiEnabled;
    }

    public void setUpiEnabled(Boolean value) {
        upiEnabled = value;
    }

    public String getPaymentProvider() {
        return paymentProvider;
    }

    public void setPaymentProvider(String value) {
        paymentProvider = value;
    }

    public String getConfiguration() {
        return configuration;
    }

    public void setConfiguration(String value) {
        configuration = value;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean value) {
        active = value;
    }
}
