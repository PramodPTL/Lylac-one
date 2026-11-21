package com.salesmanager.core.model.storefront;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.salesmanager.core.model.merchant.MerchantStore;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
@Entity
@Table(
        name = "STORE_PAYMENT_CONFIG",
        schema = "lylac_storefront",
        indexes = {
                @Index(
                        name = "IDX_PAYMENT_CONFIG_STORE",
                        columnList = "MERCHANT_ID"
                )
        }
)
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
public class StorePaymentConfig extends StorefrontEntity {

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "MERCHANT_ID",
            nullable = false,
            unique = true
    )
    private MerchantStore merchantStore;

    @Column(name = "COD_ENABLED", nullable = false)
    private boolean codEnabled = true;

    @Column(name = "ONLINE_PAYMENT_ENABLED", nullable = false)
    private boolean onlinePaymentEnabled = true;

    @Column(name = "UPI_ENABLED", nullable = false)
    private boolean upiEnabled = true;

    @Column(name = "PAYMENT_PROVIDER", length = 50)
    private String paymentProvider;

    @Type(type = "jsonb")
    @Column(name = "CONFIGURATION", columnDefinition = "jsonb")
    private String configuration;

    @Column(name = "IS_ACTIVE", nullable = false)
    private boolean active = true;

    public MerchantStore getMerchantStore() {
        return merchantStore;
    }

    public void setMerchantStore(MerchantStore merchantStore) {
        this.merchantStore = merchantStore;
    }

    public boolean isCodEnabled() {
        return codEnabled;
    }

    public void setCodEnabled(boolean codEnabled) {
        this.codEnabled = codEnabled;
    }

    public boolean isOnlinePaymentEnabled() {
        return onlinePaymentEnabled;
    }

    public void setOnlinePaymentEnabled(boolean onlinePaymentEnabled) {
        this.onlinePaymentEnabled = onlinePaymentEnabled;
    }

    public boolean isUpiEnabled() {
        return upiEnabled;
    }

    public void setUpiEnabled(boolean upiEnabled) {
        this.upiEnabled = upiEnabled;
    }

    public String getPaymentProvider() {
        return paymentProvider;
    }

    public void setPaymentProvider(String paymentProvider) {
        this.paymentProvider = paymentProvider;
    }

    public String getConfiguration() {
        return configuration;
    }

    public void setConfiguration(String configuration) {
        this.configuration = configuration;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}