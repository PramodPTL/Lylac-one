package com.salesmanager.core.repositories.storefront;

import org.springframework.data.jpa.repository.JpaRepository;
import com.salesmanager.core.model.storefront.StorePageSection;

public interface StorePageSectionRepository extends JpaRepository<StorePageSection, Long> {
	java.util.List<StorePageSection> findByPageIdOrderByDisplayOrderAsc(Long pageId);
}
