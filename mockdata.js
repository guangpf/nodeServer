/**
 * 影像学
 */
let mockdata1 = {
  success: true,
  code: 200,
  result: {
    data: {
      primaryFocusRadius: [
        {
          reportId: "r1",
          value: "2",
          valueText: "原发灶最大径为2cm",
          highlights: ["原发灶", "2cm"],
        },
      ],
      primarySite: [
        {
          reportId: "r4",
          value: ["I"],
          valueText: ["转移灶部位I段"],
          highlights: ["I段", "转移灶"],
        },
        {
          reportId: "r5",
          value: ["II"],
          valueText: ["转移灶部位II段"],
          highlights: ["II", "段"],
        },
      ],
      primaryNumber: [
        {
          reportId: "reportId2",
          value: "1",
          valueText: "1",
          highlight: ["肝脏呈术后改变，体积减小"],
        },
      ],
      targetLesionDiametersSum: [
        {
          reportId: "reportId3",
          value: "1",
          valueText: "1",
          highlight: ["肿瘤组织免疫组化结果"],
        },
      ],
      isMetastaticFocus: [
        {
          reportId: "r6",
          value: true,
          valueText: "转移灶",
          highlights: ["转移灶", "已确诊"],
        },
      ],
      metastaticSite: [
        {
          reportId: "r7",
          value: ["Bone", "Brain"],
          valueText: ["骨", "脑"],
          highlights: ["骨", "脑"],
        },
        {
          reportId: "r8",
          value: ["Lung"],
          valueText: ["肺部"],
          highlights: ["肺部", "转移灶部位"],
        },
        {
          reportId: "r9",
          value: ["Distant-LN"],
          valueText: ["远处淋巴结转移"],
          highlights: ["转移灶部位", "远处淋巴结转移"],
        },
      ],
      bloodVesselInvasion: [
        {
          reportId: "reportId4",
          value: true,
          valueText: "是",
          highlight: ["右肋缘下锁骨中线及腋前线处分别放置"],
        },
      ],
      involvingVessels: [
        {
          reportId: "reportId3",
          value: ["inferior-vena-cava"],
          valueText: "下腔静脉",
          highlight: ["肝细胞癌"],
        },
      ],
      bileDuctThrombi: [
        {
          reportId: "reportId4",
          value: true,
          valueText: "是",
          highlight: ["右肋缘下锁骨中线"],
        },
      ],
      involvingBileDuct: [
        {
          reportId: "reportId2",
          value: ["common-bile-duct"],
          valueText: ["胆总管"],
          highlight: ["术区见团片状低密度影"],
        },
      ],
      cirrhosis: [
        {
          reportId: "reportId2",
          value: true,
          valueText: "是",
          highlight: ["少量积液"],
        },
      ],
    },
    report: [
      {
        id: "r1",
        date: "2024-11-11 21:48:07",
        name: "原发灶最大径",
        type: "MRI",
        content: "原发灶最大径为2cm",
      },
      {
        id: "r7",
        date: "2023-12-11 21:48:07",
        name: "转移灶部位",
        type: "MRI",
        content: "转移灶部位骨、脑",
      },
      {
        id: "r8",
        date: "2023-12-11 21:48:07",
        name: "转移灶部位",
        type: "MRI",
        content: "转移灶部位肺部",
      },
      {
        id: "r9",
        date: "2023-12-11 21:48:07",
        name: "转移灶部位",
        type: "MRI",
        content: "转移灶部位肺部-远处淋巴结转移",
      },
      {
        id: "r6",
        date: "2023-12-11 21:48:07",
        name: "是否转移灶",
        type: "CT",
        content: "转移灶已经确诊",
      },
      {
        id: "r4",
        date: "2023-12-11 21:48:07",
        name: "转移灶部位",
        type: "CT",
        content: "转移灶部位I段",
      },
      {
        id: "r5",
        date: "2023-12-11 21:48:07",
        name: "转移灶部位",
        type: "CT",
        content: "转移灶部位II段",
      },
      {
        id: "reportId1",
        date: "2024-11-11 21:48:07", // 时间
        content: `检查所见；
肝脏大小、形态失常，包膜欠光整，反相位全肝信号未见明显衰减。肝实质内可见多发团块状长T1、混杂稍长T2信号，界欠清，部分融合，压脂序列呈稍高信号，边界清晰，最大者位于左叶，大小约为20.5cm ×9.6cm X14.6cm，DWI序列呈稍高信号，ADC系列呈低信号，增强扫描各期示上述病呈快进快出强化，病灶大者内见无明显强化区，肝胆特异期呈低信号。门脉左右支内见充盈缺损，肝左静脉局部显示欠清。胆囊体积不大，壁不厚，其内未见明显异常信号。胆总管未见明显扩张。胰腺显示清晰，胰管无扩张。脾脏体积不大，其内未见明显异常信号。扫及双肾形态正常，双肾内见类圆形高信号影，较大者长径约1.4cm，增强后未见明显强化。肝门部及腹膜后见多发淋巴结影。腹腔见斑片状液体高信号影。扫及间位结肠。部分腰椎附件可见结节状强化灶。
诊断意见：
1.考虑巨大肝癌伴坏死、肝内多发转移，门脉癌栓形成。腹腔积液，请结合临床。
2.部分腰椎附件异常强化灶，转移可能。
3.双肾囊肿；间位结肠。`, // 报告内容
        type: "CT", // MRI,超声
      },
      {
        id: "reportId2",
        date: "2024-11-11 21:48:07", // 时间
        content: `检查所见：患者系“肝部分切除及胆囊切除术后”
腹腔内见引流管影。肝脏呈术后改变，体积减小，术区见团片状低密度影，内见散在气体影，周缘多发致密影。肝内外胆管无明显扩张。脾脏不大，密度均匀。胰腺大小、形态正常，未见明显异常密度影。双肾大小、形态正常，未见明显异常密度影。肝门部及腹膜后未见明显肿大淋巴结影。
诊断意见
1、肝脏术后改变，请结合临床，随诊。
2、扫及双侧胸腔少量积液作两肺膨胀不全。`, // 报告内容
        type: "MRI", // MRI,超声
      },
      {
        id: "reportId3",
        date: "2024-11-11 21:48:07", // 时间
        content: `病理诊断：
（）肝细胞癌，肿瘤大小约8.5cmx8cmx7. 5cm，可见脉管内癌栓，未见神经侵犯，肝切缘及包膜未见肿瘤累及；
肿瘤组织免疫组化结果：CD34（血管+），Hepacyte （+），CK（+），CK19（胆小管+）， GFAP （-），GATA-3（-），P53（野生型+），Ki-67（+约20%），CKT（-），CK20（-），Glyplcan-3 （+）。`, // 报告内容
        type: "CT", // MRI,超声
      },
      {
        id: "reportId4",
        date: "2024-11-11 21:48:07", // 时间
        content:
          "2．于剑突下、剑突下8cm、右肋缘下锁骨中线及腋前线处分别放置＿cn、0.5cm、1cm、0.5cm Trocar，放置腹腔镜器械。用超声刀切断肝圆韧带，近腹前壁离断镰状韧带，分离至肝顶部处，将肝脏向下轻推，近隔面电刀高断右冠状韧带，离断右二角韧带、肝结肠韧带、肝肾韧带，充分游离肝脏，解剖肝十二指肠韧带，显露胆囊管、胆囊动脉、肝总管之间三角关系，结扎切断脏囊管及胆囊动脉后离断，暂不自胆囊床剥离胆囊，沿肿瘤边缘约2cm处标记切除线，间歇性Pringle手法阻断第一肝门，使用超声刀逐步离断肝实质，分离出肝脏内较大的门脉系统及肝右静脉分支，最后以直线切割闭合器离断入瘤体用大肝蒂分支，连同胆囊一并完整切除包含肿瘤在内的肝组织，置入标本袋。延长剑突下切口至4cm，将标本袋连同肿瘤完整取出。创面渗血处予以电凝、氩气喷涂后覆盖止血材料以止血，肝断面下放置双套管一根自右上腹的Trocar孔引出固定。仔细检查腹腔内无活动性出血点，清点纱布器械无误，发出腹腔镜器械，排出腹腔内气体，逐层间断缝合关闭切口。", // 报告内容
        type: "CT", // MRI,超声
      },
    ],
    isReportScopeChanged: true,
  },
  timestamp: 1731551724714,
};
let mockdata1_2 = {
  success: true,
  code: 200,
  result: {
    data: {
      // primarySite: [
      //   {
      //     reportId: "2",
      //     value: ["IV段", "VIII段"],
      //     valueText: ["IV段", "VIII段"],
      //     code: "C0457138",
      //     highlights: ["肝S4段及S8段各见一不规则稍低密度影"],
      //   },
      // ],
      // tumorRupture: [
      //   {
      //     reportId: "2",
      //     value: true,
      //     valueText: true,
      //     code: "C2938957",
      //     highlights: [
      //       "肝包膜下见少量液性密度影, 邻近肝实质局部轮廓不连续, 周围见斑片状高密度出血灶, 考虑肿瘤破裂伴包膜下出血。",
      //     ],
      //   },
      // ],
      // bileDuctThrombi: [
      //   {
      //     reportId: "2",
      //     value: true,
      //     valueText: true,
      //     code: "bileDuctThrombi",
      //   },
      // ],
      // involvingBileDuct: [
      //   {
      //     reportId: "2",
      //     value: ["肝总管"],
      //     valueText: ["肝总管"],
      //     code: "C1300065.01",
      //     highlights: [
      //       "肝总管管壁增厚, 管腔内见软组织密度影填充, 提示肝总管癌栓可能。",
      //     ],
      //   },
      // ],
      // bloodVesselInvasion: [
      //   {
      //     reportId: "2",
      //     value: true,
      //     valueText: true,
      //     code: "bloodVesselInvasion",
      //   },
      // ],
      // metastaticSite: [
      //   {
      //     reportId: "2",
      //     value: ["局部淋巴结", "肺", "骨"],
      //     valueText: ["局部淋巴结", "肺", "骨"],
      //     code: "C0036525.02",
      //     highlights: [
      //       "肝门区见数枚肿大淋巴结...考虑局部淋巴结转移...双肺下叶见多发散在结节影...胸椎T12椎体见溶骨性破坏区...考虑骨转移",
      //     ],
      //   },
      // ],
      // primaryFocusRadius: [
      //   {
      //     reportId: "2",
      //     value: "8.2",
      //     valueText: "8.2",
      //     code: "C0475440.01",
      //     highlights: ["大小约6.58.25.0cm"],
      //   },
      // ],
      // isMetastaticFocus: [
      //   {
      //     reportId: "2",
      //     value: true,
      //     valueText: true,
      //     code: "isMetastaticFocus",
      //   },
      // ],
      // targetLesionDiametersSum: [
      //   {
      //     reportId: "2",
      //     value: "10",
      //     valueText: "10",
      //     code: "C3641263",
      //     highlights: [
      //       "大小约6.58.25.0cm... 另于S8段见一大小约1.21.8cm类圆形低密度灶",
      //     ],
      //   },
      // ],
      // involvingVessels: [
      //   {
      //     reportId: "2",
      //     value: ["门静脉"],
      //     valueText: ["门静脉"],
      //     code: "C0521157.01",
      //     highlights: [],
      //   },
      // ],
      // cirrhosis: [
      //   {
      //     reportId: "2",
      //     value: false,
      //     valueText: false,
      //     code: "C0023890",
      //     highlights: [""],
      //   },
      // ],
      // primaryNumber: [
      //   {
      //     reportId: "2",
      //     value: "5.2",
      //     valueText: "5.2",
      //     code: "C1321243.01",
      //     highlights: ["肝S4段及S8段各见一不规则稍低密度影"],
      //   },
      // ],
    },
    report: [
      // {
      //   id: "2",
      //   date: "2025-05-01 00:00:00",
      //   name: "MRI",
      //   type: "C0336660",
      //   content:
      //     "肝脏形态尚可，表面略呈波浪状，肝S4段及S8段各见一不规则稍低密度影，边界欠清晰，最大者位于S4段，大小约6.58.25.0cm，动态增强扫描动脉期呈不均匀强化，门脉期及延迟期强化减退，内部可见斑片状无强化坏死区；另于S8段见一大小约1.21.8cm类圆形低密度灶，增强后边缘环形强化。肝门区见数枚肿大淋巴结，较大者长径约2.8cm，增强后呈轻度强化，考虑局部淋巴结转移。门静脉主干内可见充盈缺损，长度约3.5cm，考虑门静脉癌栓形成。肝内外胆管轻度扩张，肝总管管壁增厚，管腔内见软组织密度影填充，提示肝总管癌栓可能。胆囊体积增大，壁弥漫性增厚伴黏膜层强化。胰腺形态正常，脾脏体积增大，肋下3指。双肺下叶见多发散在结节影，较大者直径约1.6cm，边缘模糊。胸椎T12椎体见溶骨性破坏区，范围约2.11.9cm，周围软组织肿胀，增强后呈不均匀强化，考虑骨转移。脑实质内未见明显异常密度影。双肾见多发小圆形低密度灶，最大直径约1.3cm，增强后未见明显强化。腹膜后未见明显肿大淋巴结。肝包膜下见少量液性密度影，邻近肝实质局部轮廓不连续，周围见斑片状高密度出血灶，考虑肿瘤破裂伴包膜下出血。",
      // },
      // {
      //   id: "3",
      //   date: "2025-05-01 00:00:00",
      //   name: "CT",
      //   type: "C0936234",
      //   content:
      //     "肝脏形态尚可，表面略呈波浪状，肝S4段及S8段各见一不规则稍低密度影，边界欠清晰，最大者位于S4段，大小约6.58.25.0cm，动态增强扫描动脉期呈不均匀强化，门脉期及延迟期强化减退，内部可见斑片状无强化坏死区；另于S8段见一大小约1.21.8cm类圆形低密度灶，增强后边缘环形强化。肝门区见数枚肿大淋巴结，较大者长径约2.8cm，增强后呈轻度强化，考虑局部淋巴结转移。门静脉主干内可见充盈缺损，长度约3.5cm，考虑门静脉癌栓形成。肝内外胆管轻度扩张，肝总管管壁增厚，管腔内见软组织密度影填充，提示肝总管癌栓可能。胆囊体积增大，壁弥漫性增厚伴黏膜层强化。胰腺形态正常，脾脏体积增大，肋下3指。双肺下叶见多发散在结节影，较大者直径约1.6cm，边缘模糊。胸椎T12椎体见溶骨性破坏区，范围约2.11.9cm，周围软组织肿胀，增强后呈不均匀强化，考虑骨转移。脑实质内未见明显异常密度影。双肾见多发小圆形低密度灶，最大直径约1.3cm，增强后未见明显强化。腹膜后未见明显肿大淋巴结。肝包膜下见少量液性密度影，邻近肝实质局部轮廓不连续，周围见斑片状高密度出血灶，考虑肿瘤破裂伴包膜下出血。",
      // },
    ],
    isReportScopeChanged: true,
  },
  timestamp: 1749267284811,
};
/**
 * 病理学
 */
let mockdata2 = {
  success: true,
  code: 200,
  result: {
    data: {
      // specimenType: [
      //   {
      //     reportId: "reportId1",
      //     value: "biopsy-specimen",
      //     valueText: "下腔静脉",
      //     highlights: [
      //       "dsdd",
      //       "形态失常，",
      //       "“Apple”, (a)（b）苹果！香蕉@桔子#橙子￥柠檬$bbb",
      //     ],
      //   },
      // ],
      // pathologyDiagnosis: [
      //   {
      //     reportId: "reportId1",
      //     value: "hepatocellular-carcinoma",
      //     valueText: "肝细胞癌",
      //     highlight: ["肝脏呈术后改变，体积减小"],
      //   },
      // ],
      // maxDiameterTumor: [
      //   {
      //     reportId: "reportId1",
      //     value: "10",
      //     valueText: "10厘米",
      //     highlight: ["diameter", "10cm"],
      //   },
      // ],
      // numberLesions: [
      //   {
      //     reportId: "reportId1",
      //     value: "2",
      //     valueText: "2个病灶",
      //     highlight: ["lesions", "2"],
      //   },
      // ],
      // vascularInvasion: [
      //   {
      //     reportId: "reportId2",
      //     value: true,
      //     valueText: "血管侵犯",
      //     highlight: ["肝脏大小、形态失常", "invasion"],
      //   },
      // ],
      // vascularInvasionSite: [
      //   {
      //     reportId: "reportId2",
      //     value: ["肝静脉", "肝动脉"],
      //     valueText: ["肝静脉", "肝动脉"],
      //     highlight: ["hepatic", "vein"],
      //   },
      //   {
      //     reportId: "reportId3",
      //     value: ["门静脉"],
      //     valueText: ["门静脉"],
      //     highlight: ["hepatic", "vein"],
      //   },
      //   {
      //     reportId: "reportId4",
      //     value: ["下腔静脉", "肝静脉"],
      //     valueText: ["下腔静脉", "肝静脉"],
      //     highlight: ["hepatic", "vein"],
      //   },
      // ],
      // tumorLevel: [
      //   {
      //     reportId: "reportId2",
      //     value: "Ⅱ",
      //     valueText: "II级",
      //     highlight: ["tumor", "level II"],
      //   },
      // ],
      // microvascularInvasionGrade: [
      //   {
      //     reportId: "reportId2",
      //     value: "M1",
      //     valueText: "M1级",
      //     highlight: ["microvascular", "M1"],
      //   },
      // ],
      // surgicalMargin: [
      //   {
      //     reportId: "reportId3",
      //     value: "Negative-less-than-and-equals-1",
      //     valueText: "手术切缘阴性",
      //     highlight: ["surgical", "margin negative"],
      //   },
      // ],
      // tumorCapsule: [
      //   {
      //     reportId: "reportId3",
      //     value: true,
      //     valueText: "肿瘤包膜",
      //     highlight: ["tumor", "capsule"],
      //   },
      // ],
      // satelliteLesions: [
      //   {
      //     reportId: "reportId3",
      //     value: true,
      //     valueText: "卫星病灶",
      //     highlight: ["satellite", "lesions"],
      //   },
      // ],
      // cirrhosisLiver: [
      //   {
      //     reportId: "reportId3",
      //     value: true,
      //     valueText: "肝硬化",
      //     highlight: ["cirrhosis", "liver"],
      //   },
      // ],
      // peripheralNerveInvasion: [
      //   {
      //     reportId: "reportId4",
      //     value: true,
      //     valueText: "周围神经侵犯",
      //     highlight: ["peripheral", "nerve invasion"],
      //   },
      // ],
      // gallbladderInvasion: [
      //   {
      //     reportId: "reportId4",
      //     value: true,
      //     valueText: "胆囊侵犯",
      //     highlight: ["gallbladder", "invasion"],
      //   },
      // ],
      // lymphNodeMetastasis: [
      //   {
      //     reportId: "reportId4",
      //     value: true,
      //     valueText: "淋巴结转移",
      //     highlight: ["lymph", "node metastasis"],
      //   },
      // ],
      // adjacentOrgans: [
      //   {
      //     reportId: "reportId4",
      //     value: true,
      //     valueText: "邻近器官",
      //     highlight: ["adjacent", "organs"],
      //   },
      // ],
    },
    report: [
      //       {
      //         id: "reportId1",
      //         date: "2024-11-11 21:48:07", // 时间
      //         name: "报告1",
      //         content: `检查所见；
      // 肝脏大小、形态失常，包膜欠光整，反相位全肝信号未见明显衰减。肝实质内可见多发团块状长T1、混杂稍长T2信号，界欠清，部分融合，压脂序列呈稍高信号，边界清晰，最大者位于左叶，大小约为20.5cm ×9.6cm X14.6cm，DWI序列呈稍高信号，ADC系列呈低信号，增强扫描各期示上述病呈快进快出强化，病灶大者内见无明显强化区，肝胆特异期呈低信号。门脉左右支内见充盈缺损，肝左静脉局部显示欠清。胆囊体积不大，壁不厚，其内未见明显异常信号。胆总管未见明显扩张。胰腺显示清晰，胰管无扩张。脾脏体积不大，其内未见明显异常信号。扫及双肾形态正常，双肾内见类圆形高信号影，较大者长径约1.4cm，增强后未见明显强化。肝门部及腹膜后见多发淋巴结影。腹腔见斑片状液体高信号影。扫及间位结肠。部分腰椎附件可见结节状强化灶。
      // 诊断意见：
      // 1.考虑巨大肝癌伴坏死、肝内多发转移，门脉癌栓形成。腹腔积液，请结合临床。
      // 2.部分腰椎附件异常强化灶，转移可能。
      // 3.双肾囊肿；间位结肠。“Apple”, (a)（b）苹果！香蕉@桔子#橙子￥柠檬$bbb
      // javascript:alert('被点击了！')`, // 报告内容
      //         type: "CT", // MRI,超声
      //       },
      //       {
      //         id: "reportId2",
      //         date: "2024-11-11 21:48:07", // 时间
      //         name: "报告2",
      //         content: `检查所见：患者系“肝部分切除及胆囊切除术后”
      // 腹腔内见引流管影。肝脏呈术后改变，体积减小，术区见团片状低密度影，内见散在气体影，周缘多发致密影。肝内外胆管无明显扩张。脾脏不大，密度均匀。胰腺大小、形态正常，未见明显异常密度影。双肾大小、形态正常，未见明显异常密度影。肝门部及腹膜后未见明显肿大淋巴结影。
      // 诊断意见
      // 1、肝脏术后改变，请结合临床，随诊。
      // 2、扫及双侧胸腔少量积液作两肺膨胀不全。`, // 报告内容
      //         type: "CT", // MRI,超声
      //       },
      //       {
      //         id: "reportId3",
      //         date: "2024-11-11 21:48:07", // 时间
      //         name: "报告3",
      //         content: `病理诊断：
      // （）肝细胞癌，肿瘤大小约8.5cmx8cmx7. 5cm，可见脉管内癌栓，未见神经侵犯，肝切缘及包膜未见肿瘤累及；
      // 肿瘤组织免疫组化结果：CD34（血管+），Hepacyte （+），CK（+），CK19（胆小管+）， GFAP （-），GATA-3（-），P53（野生型+），Ki-67（+约20%），CKT（-），CK20（-），Glyplcan-3 （+）。`, // 报告内容
      //         type: "CT", // MRI,超声
      //       },
      //       {
      //         id: "reportId4",
      //         date: "2024-11-11 21:48:07", // 时间
      //         name: "报告4",
      //         content:
      //           "2．于剑突下、剑突下8cm、右肋缘下锁骨中线及腋前线处分别放置＿cn、0.5cm、1cm、0.5cm Trocar，放置腹腔镜器械。用超声刀切断肝圆韧带，近腹前壁离断镰状韧带，分离至肝顶部处，将肝脏向下轻推，近隔面电刀高断右冠状韧带，离断右二角韧带、肝结肠韧带、肝肾韧带，充分游离肝脏，解剖肝十二指肠韧带，显露胆囊管、胆囊动脉、肝总管之间三角关系，结扎切断脏囊管及胆囊动脉后离断，暂不自胆囊床剥离胆囊，沿肿瘤边缘约2cm处标记切除线，间歇性Pringle手法阻断第一肝门，使用超声刀逐步离断肝实质，分离出肝脏内较大的门脉系统及肝右静脉分支，最后以直线切割闭合器离断入瘤体用大肝蒂分支，连同胆囊一并完整切除包含肿瘤在内的肝组织，置入标本袋。延长剑突下切口至4cm，将标本袋连同肿瘤完整取出。创面渗血处予以电凝、氩气喷涂后覆盖止血材料以止血，肝断面下放置双套管一根自右上腹的Trocar孔引出固定。仔细检查腹腔内无活动性出血点，清点纱布器械无误，发出腹腔镜器械，排出腹腔内气体，逐层间断缝合关闭切口。", // 报告内容
      //         type: "CT", // MRI,超声
      //       },
    ],
    isReportScopeChanged: true,
    requestId: "requestId",
    structuredResultConfirm: "structuredResultConfirm",
  },
  timestamp: 1731295137570,
};
let mockdata2_2 = {
  success: true,
  code: 200,
  result: {
    data: {
      // microvascularInvasionGrade: [
      //   {
      //     reportId: "1",
      //     value: "M1",
      //     valueText: "M1",
      //     code: "C1302492",
      //     highlights: [
      //       "术后病理证实为肝细胞癌（中分化，肿瘤直径5.2cm，脉管癌栓阳性）",
      //     ],
      //   },
      // ],
      // numberLesions: [
      //   {
      //     reportId: "1",
      //     value: "1",
      //     valueText: "1",
      //     code: "C1321243.02",
      //     highlights: [
      //       "腹部增强MRI显示肝脏S6段切除床边缘出现1.8cm×2.1cm强化结节",
      //     ],
      //   },
      // ],
      // vascularInvasionSite: [
      //   {
      //     reportId: "1",
      //     value: ["门静脉"],
      //     valueText: ["门静脉"],
      //     code: "C0521157.02",
      //     highlights: [
      //       "术后病理证实为肝细胞癌（中分化，肿瘤直径5.2cm，脉管癌栓阳性）",
      //     ],
      //   },
      // ],
      // adjacentOrgans: [
      //   {
      //     reportId: "1",
      //     value: false,
      //     valueText: false,
      //     code: "C1300065.04",
      //     highlights: [""],
      //   },
      // ],
      // satelliteLesions: [
      //   {
      //     reportId: "1",
      //     value: true,
      //     valueText: true,
      //     code: "C1710016",
      //     highlights: [
      //       "2023年8月15日复查腹部MRI发现肝内新增3处小于1cm的卫星灶",
      //     ],
      //   },
      // ],
      // lymphNodeMetastasis: [
      //   {
      //     reportId: "1",
      //     value: false,
      //     valueText: false,
      //     code: "C0746319",
      //     highlights: [""],
      //   },
      // ],
      // surgicalMargin: [
      //   {
      //     reportId: "1",
      //     value: "阴性（未明确具体数值）",
      //     valueText: "阴性（未明确具体数值）",
      //     code: "C0229985",
      //     highlights: [""],
      //   },
      // ],
      // maxDiameterTumor: [
      //   {
      //     reportId: "1",
      //     value: "5.2",
      //     valueText: "5.2",
      //     code: "C0475440.02",
      //     highlights: [
      //       "术后病理证实为肝细胞癌（中分化，肿瘤直径5.2cm，脉管癌栓阳性）",
      //     ],
      //   },
      // ],
      // vascularInvasion: [
      //   {
      //     reportId: "1",
      //     value: true,
      //     valueText: true,
      //     code: "vascularInvasion",
      //   },
      // ],
      // gallbladderInvasion: [
      //   {
      //     reportId: "1",
      //     value: false,
      //     valueText: false,
      //     code: "C1276689.02",
      //     highlights: [""],
      //   },
      // ],
      // pathologyDiagnosis: [
      //   {
      //     reportId: "1",
      //     value: "肝细胞癌",
      //     valueText: "肝细胞癌",
      //     code: "C5554790",
      //     highlights: [
      //       "病理回报见异型肝细胞呈梁索状排列，免疫组化HepPar-1（+）、GPC-3（++）、CD34显示微血管密度增加，符合肝癌复发诊断。",
      //     ],
      //   },
      // ],
      // specimenType: [
      //   {
      //     reportId: "1",
      //     value: "穿刺活检标本",
      //     valueText: "穿刺活检标本",
      //     code: "C0456204",
      //     highlights: ["经多学科会诊后于2023年7月25日在超声引导下行肝穿刺活检"],
      //   },
      // ],
      // peripheralNerveInvasion: [
      //   {
      //     reportId: "1",
      //     value: false,
      //     valueText: false,
      //     code: "C1300724",
      //     highlights: [""],
      //   },
      // ],
      // tumorCapsule: [
      //   {
      //     reportId: "1",
      //     value: false,
      //     valueText: false,
      //     code: "C0332650",
      //     highlights: [""],
      //   },
      // ],
      // cirrhosis: [
      //   {
      //     reportId: "1",
      //     value: false,
      //     valueText: false,
      //     code: "C0023890",
      //     highlights: [""],
      //   },
      // ],
    },
    report: [
      // {
      //   id: "1",
      //   date: "2025-05-01 00:00:00",
      //   name: "病理学",
      //   type: "C0807321.01",
      //   content:
      //     "患者于2022年3月在本院肝胆外科行肝癌根治性切除术（右半肝切除+胆囊切除术），术后病理证实为肝细胞癌（中分化，肿瘤直径5.2cm，脉管癌栓阳性），术后恢复期间规律复查甲胎蛋白（AFP）及腹部增强CT。2023年7月18日随访时主诉右侧季肋区持续性钝痛，夜间加重伴消瘦乏力，查体见巩膜轻度黄染，腹部触诊肝区叩击痛阳性，ECOG评分1分，Child-Pugh评分A级。实验室检查显示AFP值从术后稳定值12ng/ml突增至586ng/ml，异常凝血酶原（PIVKA-II）达4320mAU/ml，肝功能提示总胆红素34μmol/L，谷丙转氨酶68U/L。腹部增强MRI显示肝脏S6段切除床边缘出现1.8cm×2.1cm强化结节，动脉期明显强化，门静脉期快速廓清，结合弥散加权成像（DWI）高信号表现，放射科考虑局部复发可能，经多学科会诊后于2023年7月25日在超声引导下行肝穿刺活检，病理回报见异型肝细胞呈梁索状排列，免疫组化HepPar-1（+）、GPC-3（++）、CD34显示微血管密度增加，符合肝癌复发诊断。2023年8月3日全身PET-CT检查意外发现右肺中叶直径0.9cm高代谢结节（SUVmax=7.8），同期骨扫描显示第5腰椎右侧椎弓根放射性浓聚灶，骨科会诊行CT引导下肺结节穿刺确诊为转移性肝细胞癌，病理可见转移灶与原发灶形态学一致性，分子检测显示CTNNB1基因突变与原始肿瘤匹配。患者近期出现咳嗽伴血痰症状，胸部高分辨率CT显示右肺结节周围出现毛刺征及胸膜牵拉征，呼吸内科评估认为符合转移瘤进展特征。2023年8月15日复查腹部MRI发现肝内新增3处小于1cm的卫星灶，门静脉右支可见癌栓形成，介入放射科紧急实施经导管动脉化疗栓塞术（TACE）。目前患者正在接受仑伐替尼靶向治疗联合免疫检查点抑制剂（信迪利单抗）系统治疗，疼痛科会诊后给予羟考酮缓释片控制癌痛，营养科制定高蛋白饮食方案纠正恶病质状态，最新随访显示AFP水平波动在320-450ng/ml区间，计划下月复查全身影像评估治疗反应。左肺肿物：穿刺组织2条， 长1.2-1.5cm，直径0.1cm，全一。左肺见腺管状异性细胞，细胞呈圆形或柱形，可见核分裂象",
      // },
    ],
    isReportScopeChanged: false,
  },
  timestamp: 1749267358702,
};
/**
 * 治疗与决策
 */
let mockdata3 = {
  success: true,
  code: 200,
  result: {
    data: {
      // startTime: [
      //   {
      //     reportId: "reportId1",
      //     value: "2023-01-01",
      //     valueText: "2023-01-01",
      //     highlights: [
      //       "dsdd",
      //       "形态失常，",
      //       "“Apple”, (a)（b）苹果！香蕉@桔子#橙子￥柠檬$bbb",
      //     ],
      //   },
      // ],
      // portalHypertension: [
      //   {
      //     reportId: "reportId1",
      //     value: true,
      //     valueText: "是",
      //     highlight: ["肝脏呈术后改变，体积减小"],
      //   },
      // ],
      // recurrentDate: [
      //   {
      //     reportId: "reportId2",
      //     value: "2024-01-01",
      //     valueText: "2024-01-01",
      //     highlight: ["hepatic", "vein"],
      //   },
      // ],
      // metastasisSite: [
      //   {
      //     reportId: "reportId3",
      //     value: ["肺", "骨", "脑"],
      //     valueText: ["肺", "骨", "脑"],
      //     highlight: ["tumor", "capsule"],
      //   },
      // ],
    },
    report: [
      {
        id: "reportId1",
        date: "2024-11-11 21:48:07", // 时间
        name: "报告1",
        content: `检查所见；
      肝脏大小、形态失常，包膜欠光整，反相位全肝信号未见明显衰减。肝实质内可见多发团块状长T1、混杂稍长T2信号，界欠清，部分融合，压脂序列呈稍高信号，边界清晰，最大者位于左叶，大小约为20.5cm ×9.6cm X14.6cm，DWI序列呈稍高信号，ADC系列呈低信号，增强扫描各期示上述病呈快进快出强化，病灶大者内见无明显强化区，肝胆特异期呈低信号。门脉左右支内见充盈缺损，肝左静脉局部显示欠清。胆囊体积不大，壁不厚，其内未见明显异常信号。胆总管未见明显扩张。胰腺显示清晰，胰管无扩张。脾脏体积不大，其内未见明显异常信号。扫及双肾形态正常，双肾内见类圆形高信号影，较大者长径约1.4cm，增强后未见明显强化。肝门部及腹膜后见多发淋巴结影。腹腔见斑片状液体高信号影。扫及间位结肠。部分腰椎附件可见结节状强化灶。
      诊断意见：
      1.考虑巨大肝癌伴坏死、肝内多发转移，门脉癌栓形成。腹腔积液，请结合临床。
      2.部分腰椎附件异常强化灶，转移可能。
      3.双肾囊肿；间位结肠。“Apple”, (a)（b）苹果！香蕉@桔子#橙子￥柠檬$bbb
      javascript:alert('被点击了！')`, // 报告内容
        type: "CT", // MRI,超声
      },
      {
        id: "reportId2",
        date: "2024-11-11 21:48:07", // 时间
        name: "报告2",
        content: `检查所见：患者系“肝部分切除及胆囊切除术后”
      腹腔内见引流管影。肝脏呈术后改变，体积减小，术区见团片状低密度影，内见散在气体影，周缘多发致密影。肝内外胆管无明显扩张。脾脏不大，密度均匀。胰腺大小、形态正常，未见明显异常密度影。双肾大小、形态正常，未见明显异常密度影。肝门部及腹膜后未见明显肿大淋巴结影。
      诊断意见
      1、肝脏术后改变，请结合临床，随诊。
      2、扫及双侧胸腔少量积液作两肺膨胀不全。`, // 报告内容
        type: "CT", // MRI,超声
      },
      {
        id: "reportId3",
        date: "2024-11-11 21:48:07", // 时间
        name: "报告3",
        content: `病理诊断：
      （）肝细胞癌，肿瘤大小约8.5cmx8cmx7. 5cm，可见脉管内癌栓，未见神经侵犯，肝切缘及包膜未见肿瘤累及 capsule；
      肿瘤组织免疫组化结果：CD34（血管+），Hepacyte （+），CK（+），CK19（胆小管+）， GFAP （-），GATA-3（-），P53（野生型+），Ki-67（+约20%），CKT（-），CK20（-），Glyplcan-3 （+）。`, // 报告内容
        type: "CT", // MRI,超声
      },
      {
        id: "reportId4",
        date: "2024-11-11 21:48:07", // 时间
        name: "报告4",
        content:
          "2．于剑突下、剑突下8cm、右肋缘下锁骨中线及腋前线处分别放置＿cn、0.5cm、1cm、0.5cm Trocar，放置腹腔镜器械。用超声刀切断肝圆韧带，近腹前壁离断镰状韧带，分离至肝顶部处，将肝脏向下轻推，近隔面电刀高断右冠状韧带，离断右二角韧带、肝结肠韧带、肝肾韧带，充分游离肝脏，解剖肝十二指肠韧带，显露胆囊管、胆囊动脉、肝总管之间三角关系，结扎切断脏囊管及胆囊动脉后离断，暂不自胆囊床剥离胆囊，沿肿瘤边缘约2cm处标记切除线，间歇性Pringle手法阻断第一肝门，使用超声刀逐步离断肝实质，分离出肝脏内较大的门脉系统及肝右静脉分支，最后以直线切割闭合器离断入瘤体用大肝蒂分支，连同胆囊一并完整切除包含肿瘤在内的肝组织，置入标本袋。延长剑突下切口至4cm，将标本袋连同肿瘤完整取出。创面渗血处予以电凝、氩气喷涂后覆盖止血材料以止血，肝断面下放置双套管一根自右上腹的Trocar孔引出固定。仔细检查腹腔内无活动性出血点，清点纱布器械无误，发出腹腔镜器械，排出腹腔内气体，逐层间断缝合关闭切口。", // 报告内容
        type: "CT", // MRI,超声
      },
    ],
    isReportScopeChanged: true,
    requestId: "requestId",
    structuredResultConfirm: "structuredResultConfirm",
  },
  timestamp: 1731295137570,
};

/**
 * 病理学
 */
let mockdata4 = {
  success: true,
  code: 200,
  result: {
    data: {
      tumorRupture: [
        {
          reportId: "6",
          value: true,
          valueText: true,
          code: "C2938957",
          highlights: [
            "肝包膜下见少量液性密度影，邻近肝实质局部轮廓不连续，周围见斑片状高密度出血灶，考虑肿瘤破裂伴包膜下出血。",
          ],
        },
      ],
      primarySite: [
        {
          reportId: "6",
          value: ["IV段", "VIII段"],
          valueText: ["IV段", "VIII段"],
          code: "C0457138",
          highlights: ["肝S4段及S8段各见一不规则稍低密度影"],
        },
      ],
      tumorThrombus: [
        {
          reportId: "6",
          value: "门静脉",
          valueText: "门静脉",
          code: "C0521157.01",
          highlights: [],
        },
      ],
      bileDuctThrombi: [
        {
          reportId: "6",
          value: "肝总管",
          valueText: "肝总管",
          code: "C1300065.01",
          highlights: [
            "肝总管管壁增厚，管腔内见软组织密度影填充，提示肝总管癌栓可能。",
          ],
        },
      ],
      targetLesionSiteDiameter: [
        {
          reportId: "6",
          value: [9.2, 3.2],
          valueText: [9.2, 3.2],
          code: "C3641263",
          highlights: [
            "最大者位于S4段，大小约7.59.26.0cm; 另于S8段见一大小约3.22.8cm类圆形低密度灶",
          ],
        },
      ],
      metastasisSite: [
        {
          reportId: "6",
          value: ["肺", "骨"],
          valueText: ["肺", "骨"],
          code: "C0036525.02",
          highlights: [
            "肝门区见数枚肿大淋巴结，较大者长径约2.5cm，增强后呈轻度强化，考虑局部淋巴结转移。...双肺下叶见多发散在结节影，较大者直径约1.5cm，边缘模糊，疑肺转移灶。...胸椎T12椎体见溶骨性破坏区，范围约2.01.8cm，周围软组织肿胀，增强后呈不均匀强化，考虑骨转移。",
          ],
        },
      ],
      primaryFocusRadius: [
        {
          reportId: "6",
          value: "9.2",
          valueText: "9.2",
          code: "C0475440.01",
          highlights: ["最大者位于S4段，大小约7.59.26.0cm"],
        },
      ],
      cirrhosis: [
        {
          reportId: "6",
          value: false,
          valueText: false,
          code: "C0023890",
          highlights: [""],
        },
      ],
      primaryNumber: [
        {
          reportId: "6",
          value: "2",
          valueText: "2",
          code: "C1321243.01",
          highlights: ["肝S4段及S8段各见一不规则稍低密度影"],
        },
      ],
      ascitesValue: [
        {
          reportId: "6",
          value: "1",
          valueText: "1",
          code: "C0003962",
          highlights: [
            "肝门区见数枚肿大淋巴结，较大者长径约2.5cm，增强后呈轻度强化，考虑局部淋巴结转移。...双肺下叶见多发散在结节影，较大者直径约1.5cm，边缘模糊，疑肺转移灶。...胸椎T12椎体见溶骨性破坏区，范围约2.01.8cm，周围软组织肿胀，增强后呈不均匀强化，考虑骨转移。",
          ],
        },
      ],
    },
    report: [
      {
        id: "6",
        name: "超声",
        type: "C1875843",
        content:
          "肝脏形态尚可，表面略呈波浪状，肝S4段及S8段各见一不规则稍低密度影，边界欠清晰，最大者位于S4段，大小约7.59.26.0cm，动态增强扫描动脉期呈不均匀强化，门脉期及延迟期强化减退，内部可见斑片状无强化坏死区；另于S8段见一大小约3.22.8cm类圆形低密度灶，增强后边缘环形强化。肝门区见数枚肿大淋巴结，较大者长径约2.5cm，增强后呈轻度强化，考虑局部淋巴结转移。门静脉主干内可见充盈缺损，长度约4.5cm，考虑门静脉癌栓形成。肝内外胆管轻度扩张，肝总管管壁增厚，管腔内见软组织密度影填充，提示肝总管癌栓可能。胆囊体积增大，壁弥漫性增厚伴黏膜层强化。胰腺形态正常，脾脏体积增大，肋下3指。双肺下叶见多发散在结节影，较大者直径约1.5cm，边缘模糊，疑肺转移灶。胸椎T12椎体见溶骨性破坏区，范围约2.01.8cm，周围软组织肿胀，增强后呈不均匀强化，考虑骨转移。脑实质内未见明显异常密度影。双肾见多发小圆形低密度灶，最大直径约1.2cm，增强后未见明显强化。腹膜后未见明显肿大淋巴结。肝包膜下见少量液性密度影，邻近肝实质局部轮廓不连续，周围见斑片状高密度出血灶，考虑肿瘤破裂伴包膜下出血。",
      },
    ],
    isReportScopeChanged: true,
  },
  timestamp: 1748590028201,
};
/**
 * 病史与体征
 */
let mockdata5 = {
  success: true,
  code: 200,
  result: {
    data: {
      primarySite: [
        {
          reportId: "6",
          value: ["IV段", "VIII段"],
          valueText: ["IV段", "VIII段"],
          code: "C0457138",
          highlights: ["肝S4段及S8段各见一不规则稍低密度影"],
        },
      ],
      bileDuctThrombi: [
        {
          reportId: "6",
          value: true,
          valueText: true,
          code: "bileDuctThrombi",
        },
      ],
      metastaticSite: [
        {
          reportId: "6",
          value: ["局部淋巴结", "肺", "骨"],
          valueText: ["局部淋巴结", "肺", "骨"],
          code: "C0036525.02",
          highlights: [
            "肝门区见数枚肿大淋巴结，较大者长径约2.5cm，增强后呈轻度强化，考虑局部淋巴结转移。...双肺下叶见多发散在结节影，较大者直径约1.5cm，边缘模糊，疑肺转移灶。...胸椎T12椎体见溶骨性破坏区，范围约2.01.8cm，周围软组织肿胀，增强后呈不均匀强化，考虑骨转移。",
          ],
        },
      ],
      targetLesionDiametersSum: [
        {
          reportId: "6",
          value: 12.4,
          valueText: 12.4,
          code: "C3641263",
          highlights: [
            "最大者位于S4段，大小约7.59.26.0cm；另于S8段见一大小约3.22.8cm类圆形低密度灶",
          ],
        },
      ],
      primaryNumber: [
        {
          reportId: "6",
          value: "多发性",
          valueText: "多发性",
          code: "C1321243.01",
          highlights: ["肝S4段及S8段各见一不规则稍低密度影"],
        },
      ],
      ascitesValue: [
        {
          reportId: "6",
          value: "1",
          valueText: "1",
          code: "C0003962",
          highlights: [
            "肝门区见数枚肿大淋巴结，较大者长径约2.5cm，增强后呈轻度强化，考虑局部淋巴结转移。...双肺下叶见多发散在结节影，较大者直径约1.5cm，边缘模糊，疑肺转移灶。...胸椎T12椎体见溶骨性破坏区，范围约2.01.8cm，周围软组织肿胀，增强后呈不均匀强化，考虑骨转移。",
          ],
        },
      ],
      encephalopathyValue: [
        {
          reportId: "6",
          value: "4",
          valueText: "4",
          code: "C0003962",
          highlights: [
            "肝门区见数枚肿大淋巴结，较大者长径约2.5cm，增强后呈轻度强化，考虑局部淋巴结转移。...双肺下叶见多发散在结节影，较大者直径约1.5cm，边缘模糊，疑肺转移灶。...胸椎T12椎体见溶骨性破坏区，范围约2.01.8cm，周围软组织肿胀，增强后呈不均匀强化，考虑骨转移。",
          ],
        },
      ],
      tumorRupture: [
        {
          reportId: "6",
          value: true,
          valueText: true,
          code: "C2938957",
          highlights: [
            "肝包膜下见少量液性密度影，邻近肝实质局部轮廓不连续，周围见斑片状高密度出血灶，考虑肿瘤破裂伴包膜下出血。",
          ],
        },
      ],
      involvingBileDuct: [
        {
          reportId: "6",
          value: ["肝总管"],
          valueText: ["肝总管"],
          code: "C1300065.01",
          highlights: [
            "肝总管管壁增厚，管腔内见软组织密度影填充，提示肝总管癌栓可能。",
          ],
        },
      ],
      bloodVesselInvasion: [
        {
          reportId: "6",
          value: true,
          valueText: true,
          code: "bloodVesselInvasion",
        },
      ],
      primaryFocusRadius: [
        {
          reportId: "6",
          value: "9.2",
          valueText: "9.2",
          code: "C0475440.01",
          highlights: ["最大者位于S4段，大小约7.59.26.0cm"],
        },
      ],
      isMetastaticFocus: [
        {
          reportId: "6",
          value: true,
          valueText: true,
          code: "isMetastaticFocus",
        },
      ],
      involvingVessels: [
        {
          reportId: "6",
          value: ["门静脉"],
          valueText: ["门静脉"],
          code: "C0521157.01",
          highlights: [],
        },
      ],
      cirrhosis: [
        {
          reportId: "6",
          value: false,
          valueText: false,
          code: "C0023890",
          highlights: [""],
        },
      ],
      performanceStatusECOGValue: [
                {
                    "reportId": "1955081825156587522",
                    "value": "1",
                    "valueText": "1",
                    "code": "C1520224",
                    "highlights": [
                        "轻度睡眠障碍"
                    ]
                }
            ],
    },
    report: [
      {
        id: "6",
        date: "2025-05-01 00:00:00",
        name: "超声",
        type: "C1875843",
        content:
          "肝脏形态尚可，表面略呈波浪状，肝S4段及S8段各见一不规则稍低密度影，边界欠清晰，最大者位于S4段，大小约7.59.26.0cm，动态增强扫描动脉期呈不均匀强化，门脉期及延迟期强化减退，内部可见斑片状无强化坏死区；另于S8段见一大小约3.22.8cm类圆形低密度灶，增强后边缘环形强化。肝门区见数枚肿大淋巴结，较大者长径约2.5cm，增强后呈轻度强化，考虑局部淋巴结转移。门静脉主干内可见充盈缺损，长度约4.5cm，考虑门静脉癌栓形成。肝内外胆管轻度扩张，肝总管管壁增厚，管腔内见软组织密度影填充，提示肝总管癌栓可能。胆囊体积增大，壁弥漫性增厚伴黏膜层强化。胰腺形态正常，脾脏体积增大，肋下3指。双肺下叶见多发散在结节影，较大者直径约1.5cm，边缘模糊，疑肺转移灶。胸椎T12椎体见溶骨性破坏区，范围约2.01.8cm，周围软组织肿胀，增强后呈不均匀强化，考虑骨转移。脑实质内未见明显异常密度影。双肾见多发小圆形低密度灶，最大直径约1.2cm，增强后未见明显强化。腹膜后未见明显肿大淋巴结。肝包膜下见少量液性密度影，邻近肝实质局部轮廓不连续，周围见斑片状高密度出血灶，考虑肿瘤破裂伴包膜下出血。",
      },
    ],
    isReportScopeChanged: true,
  },
  timestamp: 1749267526601,
};

// CommonJS导出
module.exports = {
  mockdata1,
  mockdata1_2,
  mockdata2_2,
  mockdata3,
  mockdata5,
};
