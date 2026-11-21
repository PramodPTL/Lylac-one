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
        name = "STORE_SOCIAL_LINK",
        schema = "lylac_storefront",
        indexes = {
                @Index(
                        name = "IDX_SOCIAL_LINK_STORE",
                        columnList = "MERCHANT_ID"
                )
        }
)
public class StoreSocialLink extends StorefrontEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "MERCHANT_ID", nullable = false)
    private MerchantStore merchantStore;

    @NotBlank
    @Column(name = "PLATFORM", length = 50, nullable = false)
    private String platform;

    @NotBlank
    @Column(name = "URL", length = 500, nullable = false)
    private String url;

    @Column(name = "DISPLAY_ORDER", nullable = false)
    private Integer displayOrder = 0;

    @Column(name = "IS_ACTIVE", nullable = false)
    private boolean active = true;

    public MerchantStore getMerchantStore() {
        return merchantStore;
    }

    public void setMerchantStore(MerchantStore merchantStore) {
        this.merchantStore = merchantStore;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}