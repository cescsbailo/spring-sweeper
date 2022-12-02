package com.codersdungeon.minesweeper;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class TestLoadGameListJson {
    private static final Logger Log = LoggerFactory.getLogger(TestLoadGameListJson.class);

    private final ObjectMapper objectMapper = new ObjectMapper();
/*
    @Test
    void loadList() throws IOException {
        File jsonFile = Paths.get("src","main","resources","cellList.json").toFile();
        LoadGameDTO dto = objectMapper.readValue(jsonFile,LoadGameDTO.class);
        String json = objectMapper.writeValueAsString(dto);
        Log.info("{}",json);
    }*/

}
