package com.salesmanager.core.model.storefront;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "STORE_PAYMENT_CONFIG", schema = "lylac_storefront")
public class StorePaymentConfig extends StorefrontEntity {
    @javax.persistence.Column(name = "COD_ENABLED")
    private Boolean codEnabled = true;
    @javax.persistence.Column(name = "ONLINE_PAYMENT_ENABLED")
    private Boolean onlinePaymentEnabled = true;
    @javax.persistence.Column(name = "UPI_ENABLED")
    private Boolean upiEnabled = true;
    @javax.persistence.Column(name = "PAYMENT_PROVIDER", length = 50)
    private String paymentProvider;
    @javax.persistence.Column(name = "CONFIGURATION", columnDefinition = "jsonb")
    private String configuration;
    @javax.persistence.Column(name = "IS_ACTIVE")
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
