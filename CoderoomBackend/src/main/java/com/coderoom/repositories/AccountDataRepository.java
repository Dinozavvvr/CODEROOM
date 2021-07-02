package com.coderoom.repositories;

import com.coderoom.models.user.AccountData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * created: 25-04-2021 - 15:58
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
public interface AccountDataRepository extends JpaRepository<AccountData, Long> {

    @Query(nativeQuery=true, value="SELECT * FROM account_data ORDER BY random() LIMIT 10")
    List<AccountData> findRandom();

}
