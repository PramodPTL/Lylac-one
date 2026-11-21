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

import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
@Entity
@Table(
        name = "STORE_HOMEPAGE_SECTION",
        schema = "lylac_storefront",
        indexes = {
                @Index(
                        name = "IDX_HOMEPAGE_SECTION_STORE",
                        columnList = "MERCHANT_ID"
                )
        }
)
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
public class StoreHomepageSection extends StorefrontEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "MERCHANT_ID", nullable = false)
    private MerchantStore merchantStore;

    @NotBlank
    @Column(name = "SECTION_TYPE", length = 50, nullable = false)
    private String sectionType;

    @Column(name = "TITLE", length = 255)
    private String title;

    @Column(name = "SUBTITLE", length = 500)
    private String subtitle;

    @Column(name = "IMAGE_URL", length = 500)
    private String imageUrl;

    @Type(type = "jsonb")
    @Column(name = "CONFIGURATION", columnDefinition = "jsonb")
    private String configuration;

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

    public String getSectionType() {
        return sectionType;
    }

    public void setSectionType(String sectionType) {
        this.sectionType = sectionType;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getConfiguration() {
        return configuration;
    }

    public void setConfiguration(String configuration) {
        this.configuration = configuration;
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