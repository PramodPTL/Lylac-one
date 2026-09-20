package com.salesmanager.core.repositories.storefront;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.salesmanager.core.model.storefront.StoreHomepageSection;

public interface StoreHomepageSectionRepository extends JpaRepository<StoreHomepageSection, Long> {
	List<StoreHomepageSection> findByMerchantIdAndActiveTrueOrderByDisplayOrderAsc(Integer merchantId);
	List<StoreHomepageSection> findByMerchantIdOrderByDisplayOrderAsc(Integer merchantId);
}
