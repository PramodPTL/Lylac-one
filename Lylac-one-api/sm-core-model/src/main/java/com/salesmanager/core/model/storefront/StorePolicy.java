package com.salesmanager.core.model.storefront;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import com.salesmanager.core.model.merchant.MerchantStore;

@Entity
@Table(
        name = "STORE_POLICY",
        schema = "lylac_storefront",
        indexes = {
                @Index(
                        name = "IDX_STORE_POLICY_STORE",
                        columnList = "MERCHANT_ID"
                )
        }
)
public class StorePolicy extends StorefrontEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "MERCHANT_ID", nullable = false)
    private MerchantStore merchantStore;

    @NotBlank
    @Column(name = "POLICY_TYPE", length = 50, nullable = false)
    private String policyType;

    @NotBlank
    @Column(name = "TITLE", length = 255, nullable = false)
    private String title;

    @Column(name = "CONTENT", columnDefinition = "text")
    private String content;

    @Column(name = "IS_ACTIVE", nullable = false)
    private boolean active = true;

    public MerchantStore getMerchantStore() {
        return merchantStore;
    }

    public void setMerchantStore(MerchantStore merchantStore) {
        this.merchantStore = merchantStore;
    }

    public String getPolicyType() {
        return policyType;
    }

    public void setPolicyType(String policyType) {
        this.policyType = policyType;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}