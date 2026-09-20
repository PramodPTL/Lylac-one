package com.salesmanager.core.repositories.storefront;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.salesmanager.core.model.storefront.StoreBusinessHours;

public interface StoreBusinessHoursRepository extends JpaRepository<StoreBusinessHours, Long> {
	List<StoreBusinessHours> findByMerchantIdOrderByDayOfWeekAsc(Integer merchantId);
}
