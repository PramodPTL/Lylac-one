package com.salesmanager.core.model.storefront;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

import com.salesmanager.core.model.merchant.MerchantStore;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(
        name = "STORE_PAGE",
        schema = "lylac_storefront",
        indexes = {
                @Index(
                        name = "IDX_STORE_PAGE_STORE",
                        columnList = "MERCHANT_ID"
                )
        }
)
public class StorePage extends StorefrontEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "MERCHANT_ID", nullable = false)
    private MerchantStore merchantStore;

    @NotBlank
    @Column(name = "PAGE_TYPE", length = 50, nullable = false)
    private String pageType;

    @NotBlank
    @Column(name = "SLUG", length = 150, nullable = false)
    private String slug;

    @NotBlank
    @Column(name = "TITLE", length = 255, nullable = false)
    private String title;

    @Column(name = "DESCRIPTION", columnDefinition = "text")
    private String description;

    @Column(name = "IS_PUBLISHED", nullable = false)
    private boolean published = false;

    @Column(name = "META_TITLE", length = 255)
    private String metaTitle;

    @Column(name = "META_DESCRIPTION", length = 500)
    private String metaDescription;

    @Column(name = "VERSION", nullable = false)
    private Long version = 0L;

    public MerchantStore getMerchantStore() {
        return merchantStore;
    }

    public void setMerchantStore(MerchantStore merchantStore) {
        this.merchantStore = merchantStore;
    }

    public String getPageType() {
        return pageType;
    }

    public void setPageType(String pageType) {
        this.pageType = pageType;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isPublished() {
        return published;
    }

    public void setPublished(boolean published) {
        this.published = published;
    }

    public String getMetaTitle() {
        return metaTitle;
    }

    public void setMetaTitle(String metaTitle) {
        this.metaTitle = metaTitle;
    }

    public String getMetaDescription() {
        return metaDescription;
    }

    public void setMetaDescription(String metaDescription) {
        this.metaDescription = metaDescription;
    }

    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }

    @OneToMany(
            mappedBy = "page",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<StorePageSection> sections = new HashSet<>();
    public Set<StorePageSection> getSections() {
        return sections;
    }

    public void setSections(Set<StorePageSection> sections) {
        this.sections = sections;
    }
    public void addSection(StorePageSection section) {
        sections.add(section);
        section.setPage(this);
    }

    public void removeSection(StorePageSection section) {
        sections.remove(section);
        section.setPage(null);
    }
}